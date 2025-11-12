import { useChatStore } from '../../stores/chatStore';
import { Select } from '../ui/Select';

export function ThreadSelector() {
  const threads = useChatStore((state) => state.threads);
  const currentThreadId = useChatStore((state) => state.currentThreadId);
  const setCurrentThread = useChatStore((state) => state.setCurrentThread);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentThread(e.target.value);
  };

  const options = threads.map((thread) => ({
    value: thread.id,
    label: thread.name,
  }));

  // Add a placeholder option if no threads exist
  if (options.length === 0) {
    options.push({
      value: '',
      label: 'No threads yet',
    });
  }

  return (
    <Select
      value={currentThreadId || ''}
      onChange={handleChange}
      options={options}
      className="w-[200px] h-8 text-sm"
    />
  );
}
