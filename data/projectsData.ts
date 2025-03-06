// Import the JSON data
import independenceRepo from '../independence_repo.json'

interface Project {
  title: string
  description: string
  size?: number
  href?: string
  imgSrc?: string
  is_restricted: boolean,
  type: string
}

const projectsData: Project[] = independenceRepo.map((repo) => ({
  title: repo.name,
  description: repo.description,
  size: repo.size,
  imgSrc: '/static/images/time-machine.jpg',
  href: repo.url,
  is_restricted: repo.is_restricted,
  type: repo.type
}))

// Use the data
console.log(independenceRepo)

export default projectsData
