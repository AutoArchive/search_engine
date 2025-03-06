import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

type LinkItem = {
  name: string;
  url: string;
  description: string;
  tags: string[];
};

type CategoryItem = {
  category: string;
  links: LinkItem[];
};

interface NavigationProps {
  data: CategoryItem[];
}

const getTagColor = (tag: string) => {
  switch (tag) {
    case 'MtF':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
    case 'FtM':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case '社区':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case '社区性':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case '性':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case '香港':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case '台湾':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case '大陆':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case '医疗':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case '精神科':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case '健康':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case '学术':
      return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
    case '指南':
      return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

const Navigation: React.FC<NavigationProps> = ({ data }) => {
  return (
    <div className="navigation-container space-y-8">
      {data.map((category) => (
        <div key={category.category} className="category-section">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-200 dark:border-gray-700">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {link.name}
                  </span>
                  <FiExternalLink className="h-4 w-4 text-gray-500" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                  {link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                  {link.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {link.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Navigation; 