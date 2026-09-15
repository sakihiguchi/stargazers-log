const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium'
  }).format(new Date(dateString));
}

function createRepositoryCard(repository) {
  const article = document.createElement('article');
  article.className = 'repository';
  article.innerHTML = `
    <div>
      <h3><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.repository}</a></h3>
      <p class="description">${repository.description}</p>
      <div class="meta">
        <span>${repository.language}</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </div>
    </div>
    <div class="star-count" aria-label="${repository.stars} stars">★ ${repository.stars}</div>
  `;
  return article;
}

async function loadRepositories() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const repositories = await response.json();
    repositoryCount.textContent = `${repositories.length} repositories`;
    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
  } catch (error) {
    repositoryCount.textContent = 'Unable to load repositories';
    repositoryList.innerHTML = '<p class="status">The repository list could not be loaded. Please try again later.</p>';
    console.error(error);
  }
}

loadRepositories();
