import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export default function MarkdownViewer({
  content,
  className = "",
}: MarkdownViewerProps) {
  return (
    <div className={`markdown-viewer ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom styling for various markdown elements
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-emerald-800 dark:text-yellow-200 mb-4 pb-2 border-b border-emerald-200 dark:border-yellow-600">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-emerald-800 dark:text-yellow-200 mb-3 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-yellow-200 mb-2 mt-4">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-emerald-800 dark:text-yellow-200 mb-2 mt-3">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-semibold text-emerald-800 dark:text-yellow-200 mb-1 mt-2">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs font-semibold text-emerald-800 dark:text-yellow-200 mb-1 mt-2">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="text-emerald-700 dark:text-yellow-300 mb-3 leading-relaxed">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-emerald-800 dark:text-yellow-200">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-emerald-800 dark:text-yellow-200">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-emerald-700 dark:text-yellow-300 mb-3 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-emerald-700 dark:text-yellow-300 mb-3 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="ml-4">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-emerald-300 dark:border-yellow-500 pl-4 italic text-emerald-600 dark:text-yellow-400 mb-3 bg-emerald-50 dark:bg-yellow-900/20 py-2 rounded-r">
              {children}
            </blockquote>
          ),
          code: ({
            inline,
            className,
            children,
            ...props
          }: React.ComponentProps<"code"> & { inline?: boolean }) => {
            if (inline) {
              return (
                <code
                  className="bg-emerald-100 dark:bg-yellow-800/50 text-emerald-800 dark:text-yellow-200 px-1 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={`block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-sm font-mono ${
                  className || ""
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200 dark:border-gray-700">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-emerald-600 dark:text-yellow-400 hover:text-emerald-800 dark:hover:text-yellow-200 underline hover:no-underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-emerald-200 dark:border-yellow-600 rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-emerald-50 dark:bg-yellow-900/30">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white dark:bg-yellow-900/10">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-emerald-100 dark:border-yellow-700">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border border-emerald-200 dark:border-yellow-600 px-4 py-2 text-left font-semibold text-emerald-800 dark:text-yellow-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-emerald-200 dark:border-yellow-600 px-4 py-2 text-emerald-700 dark:text-yellow-300">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="border-emerald-200 dark:border-yellow-600 my-6" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
