// Utility to load MDX files dynamically
export async function loadMDXFiles(directory) {
  const modules = import.meta.glob('/blogs/*.mdx', { eager: true });
  const services = import.meta.glob('/services/*.mdx', { eager: true });
  const works = import.meta.glob('/works/*.mdx', { eager: true });
  
  if (directory === 'blogs') {
    return Object.values(modules).map(module => ({
      default: module.default,
      frontmatter: module.frontmatter || {}
    }));
  } else if (directory === 'services') {
    return Object.values(services).map(module => ({
      default: module.default,
      frontmatter: module.frontmatter || {}
    }));
  } else if (directory === 'works') {
    return Object.values(works).map(module => ({
      default: module.default,
      frontmatter: module.frontmatter || {}
    }));
  }
  
  return [];
}

// Parse frontmatter from MDX content
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  const frontmatter = {};
  
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/["']/g, ''));
      }
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content: body };
}

