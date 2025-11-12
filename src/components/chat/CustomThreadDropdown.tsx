import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Trash2 } from 'lucide-react';
import { useChatStore } from '../../stores/chatStore';

export function CustomThreadDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const threads = useChatStore((state) => state.threads);
  const currentThreadId = useChatStore((state) => state.currentThreadId);
  const setCurrentThread = useChatStore((state) => state.setCurrentThread);
  const deleteThread = useChatStore((state) => state.deleteThread);

  const currentThread = threads.find((t) => t.id === currentThreadId);
  const displayName = currentThread?.name || 'No threads yet';

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleThreadSelect = (threadId: string) => {
    setCurrentThread(threadId);
    setIsOpen(false);
  };

  const handleThreadDelete = (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation(); // Prevent thread selection
    deleteThread(threadId);
  };

  return (
    <div ref={dropdownRef} className="relative min-w-[120px] max-w-[200px] w-full">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-8 px-3 pr-6 text-primary text-[13px]
                   flex items-center justify-between
                   hover:bg-glass-darker rounded transition-colors
                   focus:outline-none"
      >
        <span className="truncate">{displayName}</span>
        <ChevronDown
          size={16}
          className={`absolute right-1 text-secondary transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 z-50
                     glass-card backdrop-blur-lg border border-border-subtle
                     rounded-lg shadow-lg overflow-hidden"
        >
          {threads.length === 0 ? (
            <div className="px-3 py-2 text-[13px] text-tertiary">
              No threads yet
            </div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto">
              {threads.map((thread) => {
                const isCurrentThread = thread.id === currentThreadId;
                return (
                  <div
                    key={thread.id}
                    className="group relative flex items-center justify-between
                               px-3 py-2 text-[13px] cursor-pointer
                               hover:bg-glass-light transition-colors"
                    onClick={() => handleThreadSelect(thread.id)}
                  >
                    {/* Thread Name with Check Icon */}
                    <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                      {isCurrentThread && (
                        <Check size={14} className="text-accent-blue flex-shrink-0" />
                      )}
                      <span className={`truncate ${isCurrentThread ? 'text-accent-blue font-medium' : 'text-primary'}`}>
                        {thread.name}
                      </span>
                    </div>

                    {/* Delete Icon - Show on hover */}
                    <button
                      onClick={(e) => handleThreadDelete(e, thread.id)}
                      className="p-1 rounded opacity-0 group-hover:opacity-100
                                 hover:bg-red-500/20 hover:text-red-400
                                 transition-all flex-shrink-0"
                      title="Delete thread"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
