import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

// Function to convert a single YAML file to JSON
const convertYamlToJson = (yamlFilePath, jsonFilePath) => {
  const yamlFile = fs.readFileSync(yamlFilePath, 'utf8');
  const jsonData = yaml.load(yamlFile);
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
  return jsonData;
};

// Function to generate meta data for a single file
const generateFileMeta = (jsonData) => {
  const yearCount = {};
  const tagCount = {};
  const regionCount = {};

  Object.values(jsonData).forEach(item => {
    // Count the year in the date field
    const year = item['date'] ? item['date'].split('-')[0] : '未知';
    yearCount[year] = (yearCount[year] || 0) + 1;

    // Count the tags (if any)
    if (item.tags) {
      item.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }

    // Count the region (if any)
    if (item.region) {
      regionCount[item.region] = (regionCount[item.region] || 0) + 1;
    }
  });

  return {
    yearCount,
    tagCount,
    regionCount
  };
};

// Read all YAML files in the .search_index/ directory
const yamlDir = '.search_index';
const yamlFiles = fs.readdirSync(yamlDir).filter(file => path.extname(file) === '.yml');

// Initialize global counters
const globalYearCount = {};
const globalTagCount = {};
const globalRegionCount = {};
const combinedJson = {};

// Helper function to increment counts
const incrementCount = (obj, key) => {
  if (key) {
    obj[key] = (obj[key] || 0) + 1;
  }
};

// Process each YAML file
yamlFiles.forEach(file => {
  const yamlFilePath = path.join(yamlDir, file);
  const jsonFilePath = path.join(yamlDir, path.basename(file, '.yml') + '.json');
  const metaFilePath = path.join(yamlDir, path.basename(file, '.yml') + '.meta.json');
  const fileKey = path.basename(file, '.yml');

  // Convert YAML to JSON and get the data
  const jsonData = convertYamlToJson(yamlFilePath, jsonFilePath);
  
  // Generate and save individual meta file
  const fileMeta = generateFileMeta(jsonData);
  fs.writeFileSync(metaFilePath, JSON.stringify(fileMeta, null, 2));
  
  // Add to combined JSON
  combinedJson[fileKey] = jsonData;

  // Update global counts
  Object.values(jsonData).forEach(item => {
    const year = item['date'] ? item['date'].split('-')[0] : '未知';
    incrementCount(globalYearCount, year);

    if (item.tags) {
      item.tags.forEach(tag => incrementCount(globalTagCount, tag));
    }

    incrementCount(globalRegionCount, item.region);
  });
});

// Combine global counts into meta object
const globalMeta = {
  yearCount: globalYearCount,
  tagCount: globalTagCount,
  regionCount: globalRegionCount
};

// Write the global meta data
fs.writeFileSync('public/meta.json', JSON.stringify(globalMeta, null, 2));

// Write the combined JSON
fs.writeFileSync('combined_search_index.json', JSON.stringify(combinedJson, null, 2));

console.log('YAML to JSON conversion complete.');
console.log('Individual meta files, combined JSON, and global meta data generated.');
