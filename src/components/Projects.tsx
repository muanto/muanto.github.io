import React, { useEffect, useState } from 'react';

interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  private: boolean;
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_USER = 'muanto';

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Errore HTTP: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: Repository[]) => {
        if (!Array.isArray(data)) {
          throw new Error('Formato dati non valido ricevuto dall\'API');
        }

        const filteredRepos = data.filter(
          (r) => !r.fork && !r.private && r.name !== `${GITHUB_USER}.github.io`
        );

        // if (filteredRepos.length === 0) {
        //   throw new Error('Nessun repository pubblico trovato');
        // }

        setRepos(filteredRepos);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Errore nel caricamento dei repository:', err);
        if (err.message.includes('403')) {
          setError('Limite di richieste API raggiunto. Riprova più tardi.');
        } else if (err.message.includes('404')) {
          setError('Utente GitHub non trovato.');
        } else {
          setError(err.message || 'Errore nel caricamento dei repository. Riprova più tardi.');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-accent">Progetti Recenti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex justify-center col-span-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-accent">Progetti Recenti</h2>
          <div className="col-span-full text-center py-12">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 inline-block">
              <p className="text-red-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {error}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-accent">Progetti Recenti</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <div
              key={repo.name}
              className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-accent transition-all group hover:transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <h3 className="text-xl font-semibold text-accent mb-3 group-hover:text-accent-dark transition-colors">
                {repo.name}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
                {repo.description || 'Nessuna descrizione disponibile'}
              </p>

              <div className="flex items-center justify-between text-sm text-text-secondary">
                {repo.language ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <span>{repo.language}</span>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{repo.stargazers_count}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
