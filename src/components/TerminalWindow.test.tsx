import React from "react";
import { renderToString } from "react-dom/server";
import * as stylex from "@stylexjs/stylex";
import { describe, expect, it } from "vitest";
import { TerminalWindow } from "./TerminalWindow";

const styles = stylex.create({
  height: (rem: number) => ({ height: `${rem}rem` }),
});

const rootStyle = (html: string) =>
  html.match(/^<div[^>]*style="([^"]*)"/)?.[1] ?? "";

describe("TerminalWindow", () => {
  it.each([false, true])(
    "keeps dynamic styles passed in (draggable: %s)",
    (draggable) => {
      const html = renderToString(
        <TerminalWindow draggable={draggable} style={styles.height(12)}>
          ~
        </TerminalWindow>,
      );
      expect(rootStyle(html)).toContain("12rem");
    },
  );

  it("adds the drag offset alongside the passed style", () => {
    const html = renderToString(
      <TerminalWindow draggable style={styles.height(12)}>
        ~
      </TerminalWindow>,
    );
    expect(rootStyle(html)).toContain("translate(0px, 0px)");
  });
});
