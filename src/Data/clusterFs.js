import { links } from "../Components/Utils";

const HOME = "/home/ec2-user";

const FILES = {
  "faq.md": `SWECC FAQ
==========
Software Engineering Career Club at the University of Washington.

When are SWECC meetings?
> Weekly on ${links.config.meetingDay}s during ${links.config.currentQuarter.replace(/[()]/g, "")}
> Time: ${links.config.meetingTime}
> Location: ${links.config.meetingLocation}

What is SWECC?
> A student-led community for aspiring software engineers at UW.
> We run hands-on projects, mentorship, mock interviews, and career workshops.

Do I need to be a CS major?
> No. SWECC is open to every major. If you want to build software, you're in.

How do I join?
> Hop in Discord: ${links.social.discord}
> Come to a Wednesday meeting. No application required to attend.

What do you actually do?
> SWECC Labs, Mentorship, Cohort, Mock Interviews, resume reviews, and networking.

More questions?
> Email swecc@uw.edu or ask in Discord.
`,

  "programs.md": `SWECC Programs
==============

SWECC Labs
  Project teams that ship real software. Best for getting reps
  with teammates, code review, and something you can put on a resume.

Mentorship
  Pairing with an experienced student or alum. Career chats,
  recruiting help, and a person who has already done the hard parts.

Cohort Program
  A structured group that moves through recruiting season together:
  applications, interviews, and weekly accountability.

Mock Interviews
  Practice technical and behavioral interviews with peers.
  Running all year. Bring a question set or we'll give you one.

Resume Reviews
  Available throughout the year via Discord and club meetings.
`,

  "officers.md": `SWECC Officers
==============
Student leadership for the Software Engineering Career Club at UW.

Advay Patil            President
Shawn Collinge         Software Engineer
Deeksha Vatwani        Alumni Network Manager
Hoang Nguyen           Software Engineer
Randolph Jenkins       Developer
Trang Tran             Design Manager
Aditya Khowal          External Head
Anthony Wen            Marketing/Design
Eric Xiao              External Outreach
David Pham             Mentorship Manager
Devina Tavathia        External Outreach
Benjamin So            Marketing

Full bios and links: /Officers
`,

  "contact.md": `SWECC Contact
=============
Software Engineering Career Club
University of Washington, Seattle

Email      swecc@uw.edu
Discord    ${links.social.discord}
Instagram  ${links.social.instagram}
LinkedIn   ${links.social.linkedin}
GitHub     ${links.social.github}

Meetings   ${links.config.meetingDay}s, ${links.config.meetingTime}
Location   ${links.config.meetingLocation}

Mailing list
${links.resources.mailingList}
`,

  "collaborators.md": `Collaborators
=============
Companies and partners SWECC has worked with on talks, events,
and recruiting support:

  Google
  Meta
  Amazon
  Neetcode
  Relativity Space

Want to collab or sponsor compute? Email swecc@uw.edu
`,
};

function byteLen(text) {
  return new TextEncoder().encode(text).length;
}

function fileNames() {
  return Object.keys(FILES).sort();
}

export function resolveFile(name, cwd = HOME) {
  if (!name) return null;
  const trimmed = name.replace(/^\.\//, "").replace(/^~\//, "");
  const base = trimmed.split("/").pop().toLowerCase();
  const withMd = base.endsWith(".md") ? base : `${base}.md`;
  if (FILES[withMd]) {
    return { name: withMd, content: FILES[withMd], cwd };
  }
  if (FILES[base]) {
    return { name: base, content: FILES[base], cwd };
  }
  return null;
}

function formatLoginStamp() {
  const now = new Date();
  const offsetMin = 15 + Math.floor(Math.random() * 36 * 60);
  const at = new Date(now.getTime() - offsetMin * 60 * 1000);
  return at.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}

export function createClusterSession() {
  const oct3 = 1 + Math.floor(Math.random() * 220);
  const oct4 = 1 + Math.floor(Math.random() * 254);
  return {
    lastLogin: formatLoginStamp(),
    from: `128.95.${oct3}.${oct4}`,
    sessionsToday: 28 + Math.floor(Math.random() * 160),
    visitorsWeek: 180 + Math.floor(Math.random() * 640),
    cwd: HOME,
  };
}

export function motdLines(session) {
  return [
    {
      tone: "white",
      text: "user@uw.edu Website % ssh -i keys.pem ec2-user@swecc.org",
    },
    {
      tone: "white",
      text: `Last login: ${session.lastLogin} from ${session.from}`,
    },
    { tone: "white", text: "Welcome to swecc.org  (Ubuntu 22.04 LTS)" },
    { tone: "lavender", text: "" },
    {
      tone: "lavender",
      text: ` * Sessions today:          ${session.sessionsToday}`,
    },
    {
      tone: "lavender",
      text: ` * Unique visitors (week):  ${session.visitorsWeek}`,
    },
    {
      tone: "lavender",
      text: " * Type `help` or `ls` to look around. `vim faq.md` works.",
    },
    { tone: "white", text: "" },
  ];
}

const LS_LONG = () => {
  const stamp = "Sep 17 18:02";
  return fileNames()
    .map((name) => {
      const size = String(byteLen(FILES[name])).padStart(4, " ");
      return `-rw-r--r-- 1 ec2-user swecc ${size} ${stamp}  ${name}`;
    })
    .join("\n");
};

const PROGRAMS_DF = `Filesystem      Size  Used Avail Use% Mounted on
Programs        Quarter     Size
SWECC Labs      Spring      labs
Mock Interviews All Year    1:1
Resume Reviews  All Year    --
Mentorship      Winter      pairs
Networking      All Year    --
Cohort Program  Winter      crew`;

function nvidiaReport() {
  const stamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
  return `${stamp}
NVIDIA-SMI 550.54.15    CUDA Version: n/a
GPU 0: not found
Memory: 0 MiB / 0 MiB    GPU-Util: 0%

SWECC cluster compute: none (yet)
we do not have a GPU. we have discord, vibes, and a google calendar.
pls sponsor us. we will put your logo in collaborators.md and also cry less.`;
}

function notFound(cmd, arg) {
  return `${cmd}: ${arg}: No such file or directory`;
}

export function runClusterCommand(raw, cwd) {
  const line = raw.replace(/\s+/g, " ").trim();
  if (!line) return { cwd, lines: [] };

  const parts = line.split(" ");
  const cmd = parts[0];
  const args = parts.slice(1);
  const flagSet = new Set(args.filter((a) => a.startsWith("-")));
  const positional = args.filter((a) => !a.startsWith("-"));

  if (cmd === "help" || cmd === "man") {
    return {
      cwd,
      lines: [
        {
          tone: "lavender",
          text: "ls  cat  cd  pwd  vim  nvidia-smi  df  help  clear",
        },
        {
          tone: "white",
          text: "hint: cat faq.md    vim officers.md    q quits vim",
        },
      ],
    };
  }

  if (cmd === "clear") {
    return { cwd, clear: true, lines: [] };
  }

  if (cmd === "pwd") {
    return { cwd, lines: [{ tone: "lavender", text: cwd }] };
  }

  if (cmd === "whoami") {
    return { cwd, lines: [{ tone: "lavender", text: "ec2-user" }] };
  }

  if (cmd === "ls" || cmd === "ll") {
    const long = cmd === "ll" || flagSet.has("-l") || flagSet.has("-la");
    return {
      cwd,
      lines: [
        {
          tone: "lavender",
          text: long ? LS_LONG() : fileNames().join("  "),
        },
      ],
    };
  }

  if (cmd === "cd") {
    const target = positional[0];
    if (!target || target === "~" || target === HOME || target === ".") {
      return { cwd: HOME, lines: [] };
    }
    if (target === ".." || target === "/") {
      return {
        cwd,
        lines: [
          {
            tone: "white",
            text: "cd: permission denied (stay in /home/ec2-user)",
          },
        ],
      };
    }
    const file = resolveFile(target, cwd);
    if (file) {
      return {
        cwd,
        lines: [{ tone: "white", text: `cd: ${target}: Not a directory` }],
      };
    }
    return {
      cwd,
      lines: [{ tone: "white", text: notFound("cd", target) }],
    };
  }

  if (cmd === "cat" || cmd === "less" || cmd === "more" || cmd === "head") {
    if (!positional[0]) {
      return {
        cwd,
        lines: [{ tone: "white", text: `usage: ${cmd} [file]` }],
      };
    }
    const file = resolveFile(positional[0], cwd);
    if (!file) {
      return {
        cwd,
        lines: [{ tone: "white", text: notFound(cmd, positional[0]) }],
      };
    }
    return {
      cwd,
      lines: [{ tone: "lavender", text: file.content.replace(/\n$/, "") }],
    };
  }

  if (cmd === "vim" || cmd === "vi" || cmd === "nvim") {
    if (!positional[0]) {
      return {
        cwd,
        lines: [{ tone: "white", text: "VIM: nothing to edit (try vim faq.md)" }],
      };
    }
    const file = resolveFile(positional[0], cwd);
    if (!file) {
      return {
        cwd,
        lines: [{ tone: "white", text: notFound(cmd, positional[0]) }],
      };
    }
    const content = file.content.replace(/\n$/, "");
    return {
      cwd,
      vim: {
        name: file.name,
        content,
        lines: content.split("\n").length,
        bytes: byteLen(file.content),
      },
      lines: [],
    };
  }

  if (cmd === "nvidia-smi") {
    return { cwd, lines: [{ tone: "lavender", text: nvidiaReport() }] };
  }

  if (cmd === "df") {
    return { cwd, lines: [{ tone: "lavender", text: PROGRAMS_DF }] };
  }

  if (cmd === "sudo") {
    return {
      cwd,
      lines: [
        {
          tone: "white",
          text: "ec2-user is not in the sudoers file. This incident will be reported to Advay.",
        },
      ],
    };
  }

  if (cmd === "rm" || cmd === "mv" || cmd === "touch" || cmd === "chmod") {
    return {
      cwd,
      lines: [
        {
          tone: "white",
          text: `${cmd}: read-only cluster. try cat or vim instead.`,
        },
      ],
    };
  }

  return {
    cwd,
    lines: [{ tone: "white", text: `${cmd}: command not found` }],
  };
}

export { HOME as CLUSTER_HOME };
