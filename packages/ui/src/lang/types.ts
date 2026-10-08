export interface UiLanguage {
  /** BCP 47 语言标签；不限制为内置的两种语言。 */
  readonly code: string;
  readonly direction: 'ltr' | 'rtl';
  readonly messages: {
    readonly confirm: string;
    readonly cancel: string;
    readonly loading: string;
    readonly empty: string;
  };
}
