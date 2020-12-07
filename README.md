# callee-parser

```typescript
import BabelTypes from "@babel/types";

declare function calleeParser(
  source: string,
  options: CalleeParserOptions
): BabelTypes.SourceLocation[];

interface CalleeParserOptions {
  targetName: string;
  assignedVariable?: string;
}

export = calleeParser;
```
Usage analyzer of specific library in node_modules, for nodejs legacy application.
