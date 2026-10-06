package lsp

import (
	"context"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/zerodep"
)

var zerodepInspectInfo = lsproto.RequestInfo[*lsproto.DocumentSymbolParams, zerodep.FileInfo]{Method: "zerodep/inspect"}

func (s *Server) handleZerodepInspect(ctx context.Context, languageService *ls.LanguageService, params *lsproto.DocumentSymbolParams) (zerodep.FileInfo, error) {
	program := languageService.GetProgram()
	file := program.GetSourceFile(params.TextDocument.Uri.FileName())
	c, done := program.GetTypeCheckerForFileExclusive(ctx, file)
	defer done()
	return zerodep.Inspect(file, c), nil
}
