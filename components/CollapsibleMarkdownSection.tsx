// CollapsibleMarkdownSection.tsx
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import MDEditor from '@uiw/react-md-editor'

interface CollapsibleMarkdownSectionProps {
  title: string
  content: string
  isFolded: boolean
  onFoldToggle: () => void
  onContentChange: (value?: string) => void
  height?: number
  actions?: React.ReactNode
  info?: React.ReactNode
}

export function CollapsibleMarkdownSection({
  title,
  content,
  isFolded,
  onFoldToggle,
  onContentChange,
  height = 300,
  actions,
  info,
}: CollapsibleMarkdownSectionProps) {
  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onFoldToggle} className="rounded p-1 hover:bg-gray-100">
          {isFolded ? (
            <ChevronDownIcon className="h-5 w-5" />
          ) : (
            <ChevronUpIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {!isFolded && (
        <>
          <MDEditor value={content} onChange={onContentChange} height={height} />
          {(actions || info) && (
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              {info}
              {actions}
            </div>
          )}
        </>
      )}
    </div>
  )
}
