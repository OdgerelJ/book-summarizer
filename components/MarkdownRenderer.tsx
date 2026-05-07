import React from 'react';

interface MarkdownRendererProps {
  readonly text: string;
  readonly isStreaming?: boolean;
}

export function MarkdownRenderer(
  {text, isStreaming = false}: MarkdownRendererProps,
): React.JSX.Element {
  const lines = text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="text-emerald-400 text-lg font-semibold mt-6 mb-2">
          {line.replace('## ', '')}
        </h2>
      );
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <li key={i} className="text-gray-300 leading-relaxed ml-4 list-disc">
          {line.replace(/^[-*] /, '').replace(/\*\*(.*?)\*\*/g, '$1')}
        </li>
      );
    }
    if (line.startsWith('> ')) {
      return (
        <blockquote
          key={i}
          className="border-l-2 border-emerald-500 pl-4 text-gray-400 italic my-2"
        >
          {line.replace('> ', '')}
        </blockquote>
      );
    }
    if (line.trim() === '') return <br key={i} />;
    return (
      <p key={i} className="text-gray-300 leading-relaxed">
        {line.replace(/\*\*(.*?)\*\*/g, '$1')}
      </p>
    );
  });

  return (
    <div className="space-y-1">
      {lines}
      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
      )}
    </div>
  );
}
