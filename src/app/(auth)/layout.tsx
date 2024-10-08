export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <main className="flex h-screen items-center justify-center lg:h-auto">{children}</main>
      <div className="hidden h-screen bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
