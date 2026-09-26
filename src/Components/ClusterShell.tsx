import React, {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CLUSTER_HOME,
  type OutputLine,
  type VimBuffer,
  createClusterSession,
  motdLines,
  runClusterCommand,
} from "../Data/clusterFs";

type PromptLine = { tone: "prompt"; cwd: string; text: string };
type ShellLine = (OutputLine | PromptLine) & { id: string };

function Prompt({ cwd }: { cwd: string }) {
  const dir = cwd === CLUSTER_HOME ? "~" : cwd;
  return (
    <span className="cluster-shell__prompt">
      <span className="cluster-shell--white">[ec2-user</span>
      <span className="cluster-shell--lavender">@swecc.org</span>
      <span className="cluster-shell--white"> {dir}]$ </span>
    </span>
  );
}

function ClusterShell() {
  const session = useMemo(() => createClusterSession(), []);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cwd, setCwd] = useState(CLUSTER_HOME);
  const [lines, setLines] = useState<ShellLine[]>(() =>
    motdLines(session).map((line, index) => ({
      ...line,
      id: `motd-${index}`,
    }))
  );
  const [value, setValue] = useState("");
  const [vim, setVim] = useState<VimBuffer | null>(null);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);

  const focusInput = () => {
    if (!vim) inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const node = bodyRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines, vim, value]);

  const pushLines = (next: (OutputLine | PromptLine)[]) => {
    setLines((prev) => [
      ...prev,
      ...next.map((line) => ({
        ...line,
        id: `l-${idRef.current++}`,
      })),
    ]);
  };

  const run = (raw: string) => {
    const typed = raw.replace(/\s+$/, "");
    pushLines([
      {
        tone: "prompt",
        cwd,
        text: typed,
      },
    ]);
    if (!typed.trim()) return;

    setCmdHistory((prev) => (prev[prev.length - 1] === typed ? prev : [...prev, typed]));
    setHistIndex(null);

    const result = runClusterCommand(typed, cwd);
    setCwd(result.cwd);
    if ("clear" in result) {
      setLines([]);
      return;
    }
    if ("vim" in result) {
      setVim(result.vim);
      return;
    }
    if (result.lines.length) pushLines(result.lines);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(value);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      run(value);
      setValue("");
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!cmdHistory.length) return;
      const next =
        histIndex === null ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setValue(cmdHistory[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (histIndex === null) return;
      if (histIndex >= cmdHistory.length - 1) {
        setHistIndex(null);
        setValue("");
        return;
      }
      const next = histIndex + 1;
      setHistIndex(next);
      setValue(cmdHistory[next]);
    }
  };

  useEffect(() => {
    if (!vim) return undefined;
    const onVimKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "q" || event.key === "Escape") {
        event.preventDefault();
        setVim(null);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onVimKey);
    return () => window.removeEventListener("keydown", onVimKey);
  }, [vim]);

  if (vim) {
    return (
      <div
        className="cluster-shell cluster-shell--vim"
        ref={bodyRef}
        onClick={focusInput}
      >
        <pre className="cluster-shell--lavender cluster-shell__vim-body">
          {vim.content}
        </pre>
        <div className="cluster-shell__vim-bar cluster-shell--white">
          {`"${vim.name}" ${vim.lines}L, ${vim.bytes}B  [readonly]  q to quit`}
        </div>
      </div>
    );
  }

  return (
    <div className="cluster-shell" ref={bodyRef} onClick={focusInput}>
      {lines.map((line) =>
        line.tone === "prompt" ? (
          <div className="cluster-shell__row" key={line.id}>
            <Prompt cwd={line.cwd} />
            <span className="cluster-shell--white">{line.text}</span>
          </div>
        ) : (
          <pre
            key={line.id}
            className={`cluster-shell__out cluster-shell--${line.tone}`}
          >
            {line.text || " "}
          </pre>
        )
      )}
      <form className="cluster-shell__row" onSubmit={onSubmit}>
        <Prompt cwd={cwd} />
        <input
          ref={inputRef}
          className="cluster-shell__input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Cluster command"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}

export default ClusterShell;
