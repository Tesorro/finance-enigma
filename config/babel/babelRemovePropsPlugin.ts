import { PluginItem } from '@babel/core';

export default function (): PluginItem {
  return {
    visitor: {
      // Identifier(path) { // Identifier - нода Abstract Syntax Tree
      //   const { name } = path.node;
      //   // reverse the name: JavaScript -> tpircSavaJ
      //   path.node.name = name
      //     .split('')
      //     .reverse()
      //     .join('');
      // },
      Program(path, state) {
        const forbidden = state.opts.props || [];
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;
            if (forbidden.includes(nodeName)) {
              current.parentPath.remove(); // для удаления например data-testid, который используется только для тестов и в продакшн сборке не нужен
            }
          },
        });
      },
    },
  };
}
