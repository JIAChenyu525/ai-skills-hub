export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          AI Skills Hub — 发现好用的 Claude Code Skills
        </p>
        <p className="mt-1">
          Made with care at 武汉商学院 ·{" "}
          <a
            href="https://github.com/JIAChenyu525/Student-Skills"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-primary"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
