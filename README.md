Repro for https://github.com/microsoft/vscode/issues/85683.

The behaviour of typing closing brackets "eating" the brackets immediately after the cursor doesn't work correctly when typing inside a snippets "tabstop".

Consider this simple completion:

```ts
const completionText = new vscode.SnippetString();
completionText.appendText("test(onPressed: ");
completionText.appendPlaceholder("null");
completionText.appendText(")");

const item = new vscode.CompletionItem("test");
item.insertText = completionText;
```

When you accept the completion, you'll end up like this:

![Screenshot 2019-11-27 at 11 33 52 am](https://user-images.githubusercontent.com/1078012/69720117-cf637100-1109-11ea-8235-58a8e3eaa69d.png)

The word `null` is a tabstop and is highlighted. I want to type into it a function like `() => 1`. After typing the first `(`, the second `)` is inserted automatically after the word `null`, so now you have this:

![Screenshot 2019-11-27 at 11 35 21 am](https://user-images.githubusercontent.com/1078012/69720231-0c2f6800-110a-11ea-9169-954ae8b172ee.png)

Now typing the `)` would normally "overtype" the automatically inserted closing paren, but in this case it does not, so after typing `()` you now have this:

![Screenshot 2019-11-27 at 11 36 17 am](https://user-images.githubusercontent.com/1078012/69720279-26694600-110a-11ea-9129-045dde44a0eb.png)

Notice there is an extra closing paren. Finishing off by typing ` => 1` leaves you with this invalid code:

![Screenshot 2019-11-27 at 11 36 57 am](https://user-images.githubusercontent.com/1078012/69720324-47319b80-110a-11ea-81ba-019d60f71ecf.png)

For easy repro:

- Clone https://github.com/DanTup/vscode-repro-snippet-parens
- Run `npm install`
- Open in VS Code and press F5 to launch the extension in the dev host
- Open a Markdown file
- Invoke completion and select the `test` entry
- Type the characters `() => 1`
