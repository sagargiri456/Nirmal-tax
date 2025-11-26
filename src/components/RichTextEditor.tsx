import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Undo2, Redo2, Quote, Heading2, Heading3, Minus } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

type ToolbarButton = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const syncContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    syncContent();
  };

  const promptForLink = () => {
    const url = window.prompt('Enter the URL');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const promptForImage = () => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <Bold size={16} />,
      label: 'Bold',
      onClick: () => executeCommand('bold'),
    },
    {
      icon: <Italic size={16} />,
      label: 'Italic',
      onClick: () => executeCommand('italic'),
    },
    {
      icon: <Underline size={16} />,
      label: 'Underline',
      onClick: () => executeCommand('underline'),
    },
    {
      icon: <Heading2 size={16} />,
      label: 'Heading 2',
      onClick: () => executeCommand('formatBlock', 'H2'),
    },
    {
      icon: <Heading3 size={16} />,
      label: 'Heading 3',
      onClick: () => executeCommand('formatBlock', 'H3'),
    },
    {
      icon: <Minus size={16} />,
      label: 'Paragraph',
      onClick: () => executeCommand('formatBlock', 'P'),
    },
    {
      icon: <List size={16} />,
      label: 'Bulleted list',
      onClick: () => executeCommand('insertUnorderedList'),
    },
    {
      icon: <ListOrdered size={16} />,
      label: 'Numbered list',
      onClick: () => executeCommand('insertOrderedList'),
    },
    {
      icon: <Quote size={16} />,
      label: 'Quote',
      onClick: () => executeCommand('formatBlock', 'BLOCKQUOTE'),
    },
    {
      icon: <LinkIcon size={16} />,
      label: 'Insert link',
      onClick: promptForLink,
    },
    {
      icon: <ImageIcon size={16} />,
      label: 'Insert image',
      onClick: promptForImage,
    },
    {
      icon: <Undo2 size={16} />,
      label: 'Undo',
      onClick: () => executeCommand('undo'),
    },
    {
      icon: <Redo2 size={16} />,
      label: 'Redo',
      onClick: () => executeCommand('redo'),
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 px-4 py-3 bg-gray-50">
        {toolbarButtons.map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={button.onClick}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent bg-white text-gray-600 shadow-sm transition hover:border-gray-200 hover:bg-gray-100 hover:text-[#6958c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6958c2]"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className="min-h-[280px] max-h-[600px] overflow-y-auto px-4 py-3 text-sm leading-relaxed focus:outline-none sm:text-base"
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;


