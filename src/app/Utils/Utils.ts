import {
  FaDiscord,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export const links = {
  social: {
    discord: "https://discord.gg/Z8ZDcdRqrs",
    linkedin: "https://www.linkedin.com/company/swecc-uw/",
    instagram: "https://www.instagram.com/swecc.uw/",
    github: "https://github.com/swecc-uw",
  },
  programs: {
    labs: "https://labs.swecc.org",
    interviews: "https://interview.swecc.org",
    cohort: "https://engagement.swecc.org",
  },
  resources: {
    mailingList:
      "https://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist",
    calendar:
      "https://calendar.google.com/calendar/embed?src=swecc%40uw.edu&ctz=America%2FLos_Angeles",
    calendarIcs:
      "https://calendar.google.com/calendar/ical/swecc%40uw.edu/public/basic.ics",
    calendarSubscribe:
      "https://calendar.google.com/calendar/r?cid=swecc%40uw.edu",
    officerApp: "https://forms.gle/1JaS7iSeJK6CFW329",
  },
  config: {
    beholdFeedId: "5rAX7PhyjFjmyVfW4Plm",
    currentQuarter: "(Fall 2026)",
    meetingTime: "5:30-6:30PM",
    meetingDay: "Wednesday",
    meetingLocation: "Loew Hall 216",
  },
};

export const siteLinks = [
  { to: "/", label: "Home" },
  { to: "/Officers", label: "Officers" },
  { to: "/Events", label: "Events" },
];

export const communityLinks = [
  { href: links.social.discord, label: "Discord", Icon: FaDiscord },
  { href: links.social.instagram, label: "Instagram", Icon: FaInstagram },
  { href: links.social.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: links.social.github, label: "GitHub", Icon: FaGithub },
  {
    href: links.resources.mailingList,
    label: "Mailing list",
    Icon: FaEnvelopeOpenText,
  },
  { href: "mailto:swecc@uw.edu", label: "swecc@uw.edu", Icon: FaEnvelope },
];

export const externalLinkProps = (href: string) =>
  href.startsWith("mailto:")
    ? {}
    : { target: "_blank", rel: "noopener noreferrer" };
