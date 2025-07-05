
const Team = () => {
  const teamMembers = [
    { name: "Ali Mohamed", role: "Geschäftsführer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", isLeadership: true },
    { name: "Amer Kallajo", role: "Marketing und Communications Manager", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", isLeadership: true },
    { name: "Sarah Ahmed", role: "Teamleitung", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" },
    { name: "Maria Schmidt", role: "Fachkraft", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" },
    { name: "Fatima Hassan", role: "Fachkraft", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
    { name: "Anna Weber", role: "Qualitätskontrolle", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face" }
  ];

  return (
    <section
      id="team"
      className="px-4"
      style={{
        padding: `var(--section-padding-xl) var(--space-4)`,
        // Remove margin to prevent black strips between sections
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-in" style={{ marginBottom: 'var(--space-20)' }}>
          <h2 className="suz-section-title text-slate-100 mb-8">
            Unser <span className="gradient-text">Team</span>
          </h2>
          <p className="suz-text-heading-xl text-slate-300 max-w-3xl mx-auto">
            Professionelle Reinigungskräfte mit Leidenschaft für Sauberkeit
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {teamMembers.map((member, index) => (
            <article
              key={index}
              className={`suz-card-glass team-card rounded-3xl border text-center group shadow-2xl animate-fade-in ${
                member.isLeadership
                  ? 'border-blue-400/50 bg-gradient-to-br from-blue-900/40 to-slate-800/60 leadership-card'
                  : 'border-white/30'
              }`}
              style={{
                animationDelay: `${index * 0.15}s`,
                padding: 'var(--component-padding-lg)'
              }}
            >
              <div className="mb-6">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role} bei SUZ Reinigung`}
                  className={`w-28 h-28 rounded-full mx-auto object-cover shadow-lg image-optimized group-hover:scale-105 transition-transform duration-300 ${
                    member.isLeadership
                      ? 'border-4 border-blue-400/60'
                      : 'border-4 border-white/50'
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="suz-text-heading-lg font-semibold text-slate-100 mb-3">
                {member.name}
              </h3>
              <p className={`suz-text-body-lg font-medium ${
                member.isLeadership
                  ? 'text-blue-300 font-semibold'
                  : 'text-blue-400'
              }`}>
                {member.role}
              </p>
              {member.isLeadership && (
                <div className="mt-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700/50">
                    Führungsteam
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
