// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: "markdown" }, {
		provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) => {
			// Build a string like `test(onPressed: [null])` where [null] is
			// a placeholder containing "null".

			const completionText = new vscode.SnippetString();
			completionText.appendText("test(onPressed: ");
			completionText.appendPlaceholder("null");
			completionText.appendText(")");

			const item = new vscode.CompletionItem("test");
			item.insertText = completionText;
			return [item];
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
