import React, {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../components/tokens.stylex";
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
    <span {...stylex.props(styles.prompt)}>
      <span {...stylex.props(tones.white)}>[ec2-user</span>
      <span {...stylex.props(tones.lavender)}>@swecc.org</span>
      <span {...stylex.props(tones.white)}> {dir}]$ </span>
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
    })),
  );
  const [value, setValue] = useState("");
  const [vim, setVim] = useState<VimBuffer | null>(null);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);

  const focusInput = () => {
    if (!vim) inputRef.current?.focus();
  };

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

    setCmdHistory((prev) =>
      prev[prev.length - 1] === typed ? prev : [...prev, typed],
    );
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
        ref={bodyRef}
        onClick={focusInput}
        {...stylex.props(styles.shell, styles.vim)}
      >
        <pre {...stylex.props(tones.lavender, styles.vimBody)}>
          {vim.content}
        </pre>
        <div {...stylex.props(styles.vimBar, tones.white)}>
          {`"${vim.name}" ${vim.lines}L, ${vim.bytes}B  [readonly]  q to quit`}
        </div>
      </div>
    );
  }

  return (
    <div ref={bodyRef} onClick={focusInput} {...stylex.props(styles.shell)}>
      {lines.map((line) =>
        line.tone === "prompt" ? (
          <div key={line.id} {...stylex.props(styles.row)}>
            <Prompt cwd={line.cwd} />
            <span {...stylex.props(tones.white)}>{line.text}</span>
          </div>
        ) : (
          <pre
            key={line.id}
            suppressHydrationWarning={line.dynamic}
            {...stylex.props(styles.output, tones[line.tone])}
          >
            {line.text || " "}
          </pre>
        ),
      )}
      <form onSubmit={onSubmit} {...stylex.props(styles.row)}>
        <Prompt cwd={cwd} />
        <input
          ref={inputRef}
          {...stylex.props(styles.input)}
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

const tones = stylex.create({
  white: { color: colors.text },
  lavender: { color: colors.accent },
});

const styles = stylex.create({
  shell: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.mono,
    cursor: "text",
  },
  row: {
    display: "flex",
    alignItems: "baseline",
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  output: {
    margin: 0,
    font: "inherit",
    whiteSpace: "pre-wrap",
  },
  prompt: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    minWidth: 0,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "currentcolor",
    outline: "none",
    backgroundColor: "transparent",
    color: colors.text,
    font: "inherit",
    caretColor: colors.accent,
  },
  vim: {
    position: "relative",
  },
  vimBody: {
    flex: 1,
    margin: "0 0 0.5rem",
    overflow: "auto",
    font: "inherit",
    whiteSpace: "pre-wrap",
  },
  vimBar: {
    flexShrink: 0,
    marginTop: "auto",
    paddingTop: "0.5rem",
    font: "inherit",
  },
});

export default ClusterShell;
