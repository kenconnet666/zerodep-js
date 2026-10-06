param([int]$RootProcessId, [string]$StopFile)
$ErrorActionPreference = 'Stop'
# Toolhelp 快照避免每次 CIM 查询耗时一秒以上，实际采样间隔仍写入报告。
Add-Type -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
public static class ZerodepMemorySample {
  [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
  private struct Entry {
    public uint Size, Usage, Id;
    public IntPtr Heap;
    public uint Module, Threads, Parent;
    public int Priority;
    public uint Flags;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)] public string Name;
  }
  [DllImport("kernel32.dll")] private static extern IntPtr CreateToolhelp32Snapshot(uint flags, uint id);
  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] private static extern bool Process32FirstW(IntPtr snapshot, ref Entry entry);
  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] private static extern bool Process32NextW(IntPtr snapshot, ref Entry entry);
  [DllImport("kernel32.dll")] private static extern bool CloseHandle(IntPtr handle);
  public static int Count;
  public static long Read(int root) {
    var parents = new Dictionary<int, int>();
    var snapshot = CreateToolhelp32Snapshot(2, 0);
    if (snapshot == new IntPtr(-1)) throw new InvalidOperationException("Process snapshot failed");
    try {
      var entry = new Entry { Size = (uint)Marshal.SizeOf(typeof(Entry)) };
      if (Process32FirstW(snapshot, ref entry)) do { parents[(int)entry.Id] = (int)entry.Parent; } while (Process32NextW(snapshot, ref entry));
    } finally { CloseHandle(snapshot); }
    var tree = new HashSet<int> { root };
    bool changed;
    do {
      changed = false;
      foreach (var item in parents) if (tree.Contains(item.Value)) changed |= tree.Add(item.Key);
    } while (changed);
    long bytes = 0;
    Count = 0;
    foreach (var id in tree) {
      try { using (var process = Process.GetProcessById(id)) { bytes += process.WorkingSet64; Count++; } }
      catch (ArgumentException) { }
      catch (InvalidOperationException) { }
    }
    return bytes;
  }
}
'@
$peak = 0L
$samples = 0
$processCount = 0
$watch = [System.Diagnostics.Stopwatch]::StartNew()
Write-Output 'READY'
while (-not (Test-Path -LiteralPath $StopFile)) {
  $total = [ZerodepMemorySample]::Read($RootProcessId)
  $processCount = [Math]::Max($processCount, [ZerodepMemorySample]::Count)
  $peak = [Math]::Max($peak, $total)
  $samples++
  Start-Sleep -Milliseconds 100
}
@{ peakBytes = $peak; samples = $samples; elapsedMs = $watch.ElapsedMilliseconds; processCount = $processCount } | ConvertTo-Json -Compress
