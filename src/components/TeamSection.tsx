import SectionLabel from "@/components/SectionLabel";
import { MEMBERS, type Member } from "@/data/members";
import { useCopy } from "@/i18n/LocaleContext";

export default function TeamSection() {
  const copy = useCopy();
  if (MEMBERS.length === 0) return null;
  return (
    <section id="team">
      <SectionLabel note={copy.team.note} title="TEAM" />
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {MEMBERS.map((member) => (
          <MemberCard key={member.github} member={member} />
        ))}
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col gap-3 border-r border-b border-ink p-7 transition-colors last:border-r-0 hover:bg-paper">
      <div className="flex size-18 items-center justify-center overflow-hidden rounded-full border border-ink bg-ink/10 font-display text-2xl font-bold">
        {member.avatarUrl ? (
          <img
            alt={member.name}
            className="h-full w-full object-cover"
            src={member.avatarUrl}
          />
        ) : (
          member.name.charAt(0).toUpperCase()
        )}
      </div>
      <h4 className="text-lg font-bold">{member.name}</h4>
      <div className="font-display text-[11px] font-semibold tracking-[0.14em] text-mist uppercase">
        {member.role}
      </div>
      <a
        className="font-display text-xs transition-colors hover:text-scream"
        href={`https://github.com/${member.github}`}
        rel="noreferrer"
        target="_blank"
      >
        @{member.github}
      </a>
    </div>
  );
}
