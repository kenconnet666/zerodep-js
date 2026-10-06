package ls

import (
	"context"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/zerodep"
)

var ZerodepFixProvider = &CodeFixProvider{ErrorCodes: []int32{901005}, GetCodeActions: func(ctx context.Context, fix *CodeFixContext) ([]*CodeAction, error) {
	var result []*CodeAction
	for _, edit := range zerodep.Fixes(fix.SourceFile, fix.ErrorCode, fix.Span.Pos(), fix.Span.End()) {
		range_, fidelity := fix.LS.converters.ToLSPRange(fix.SourceFile, core.NewTextRange(edit.Start, edit.End))
		if fidelity.IsExact() {
			result = append(result, &CodeAction{Description: edit.Title, Changes: []*lsproto.TextEdit{{Range: range_, NewText: edit.Text}}})
		}
	}
	return result, nil
}}
