// Simple frontmatter parser
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  const frontmatter = {};
  
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentValue = [];
  let inArray = false;
  let currentObject = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (!trimmed) continue;
    
    // Check if this is a key-value pair (top level)
    if (trimmed.includes(':') && !line.startsWith(' ') && !line.startsWith('-')) {
      // Save previous array/object if exists
      if (currentKey) {
        if (inArray && currentValue.length > 0) {
          frontmatter[currentKey] = currentValue;
        } else if (!inArray && currentValue.length > 0) {
          frontmatter[currentKey] = currentValue[0];
        }
      }
      
      const colonIndex = trimmed.indexOf(':');
      currentKey = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Check if it's an array start (empty value)
      if (value === '') {
        inArray = true;
        currentValue = [];
        currentObject = null;
        continue;
      }
      
      // Handle simple array on same line
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/["']/g, ''));
        frontmatter[currentKey] = value;
        currentKey = null;
        inArray = false;
      } else {
        frontmatter[currentKey] = value;
        currentKey = null;
        inArray = false;
      }
    } 
    // Array item starting with '-'
    else if (trimmed.startsWith('-') && currentKey && inArray) {
      const itemContent = trimmed.substring(1).trim();
      
      // Check if this looks like an object (has a colon, meaning it's a key-value pair)
      if (itemContent.includes(':')) {
        currentObject = {};
        // Parse the first property on the same line
        const colonIdx = itemContent.indexOf(':');
        const objKey = itemContent.substring(0, colonIdx).trim();
        let objValue = itemContent.substring(colonIdx + 1).trim();
        
        // Remove quotes
        if ((objValue.startsWith('"') && objValue.endsWith('"')) || 
            (objValue.startsWith("'") && objValue.endsWith("'"))) {
          objValue = objValue.slice(1, -1);
        }
        
        currentObject[objKey] = objValue;
        
        // Look ahead for more object properties (indented lines)
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j];
          if (!nextLine.startsWith('  ')) break; // Not indented, done with this object
          
          const nextTrimmed = nextLine.trim();
          if (nextTrimmed.includes(':')) {
            const colonIdx = nextTrimmed.indexOf(':');
            const objKey = nextTrimmed.substring(0, colonIdx).trim();
            let objValue = nextTrimmed.substring(colonIdx + 1).trim();
            
            // Remove quotes
            if ((objValue.startsWith('"') && objValue.endsWith('"')) || 
                (objValue.startsWith("'") && objValue.endsWith("'"))) {
              objValue = objValue.slice(1, -1);
            }
            
            currentObject[objKey] = objValue;
          }
          j++;
        }
        currentValue.push(currentObject);
        i = j - 1; // Skip processed lines
        currentObject = null;
      } else if (itemContent === '') {
        // Empty item, might be followed by object properties
        currentObject = {};
        let j = i + 1;
        while (j < lines.length && lines[j].startsWith('  ')) {
          const nextTrimmed = lines[j].trim();
          if (nextTrimmed.includes(':')) {
            const colonIdx = nextTrimmed.indexOf(':');
            const objKey = nextTrimmed.substring(0, colonIdx).trim();
            let objValue = nextTrimmed.substring(colonIdx + 1).trim();
            
            if ((objValue.startsWith('"') && objValue.endsWith('"')) || 
                (objValue.startsWith("'") && objValue.endsWith("'"))) {
              objValue = objValue.slice(1, -1);
            }
            
            currentObject[objKey] = objValue;
          }
          j++;
        }
        if (Object.keys(currentObject).length > 0) {
          currentValue.push(currentObject);
        }
        i = j - 1;
        currentObject = null;
      } else {
        // Simple value
        let simpleValue = itemContent;
        if ((simpleValue.startsWith('"') && simpleValue.endsWith('"')) || 
            (simpleValue.startsWith("'") && simpleValue.endsWith("'"))) {
          simpleValue = simpleValue.slice(1, -1);
        }
        currentValue.push(simpleValue);
      }
    }
    // Indented line - property of current object
    else if (line.startsWith('  ') && currentKey && inArray && currentValue.length > 0) {
      const lastItem = currentValue[currentValue.length - 1];
      if (typeof lastItem === 'object' && lastItem !== null) {
        const trimmed = line.trim();
        if (trimmed.includes(':')) {
          const colonIdx = trimmed.indexOf(':');
          const objKey = trimmed.substring(0, colonIdx).trim();
          let objValue = trimmed.substring(colonIdx + 1).trim();
          
          if ((objValue.startsWith('"') && objValue.endsWith('"')) || 
              (objValue.startsWith("'") && objValue.endsWith("'"))) {
            objValue = objValue.slice(1, -1);
          }
          
          lastItem[objKey] = objValue;
        }
      }
    }
  }
  
  // Save final array/object
  if (currentKey && inArray && currentValue.length > 0) {
    frontmatter[currentKey] = currentValue;
  }
  
  return { frontmatter, content: body };
}

// Load all MDX files from a directory
export async function loadMDXFiles(directory) {
  const files = import.meta.glob('/blogs/*.mdx', { as: 'raw' });
  const services = import.meta.glob('/services/*.mdx', { as: 'raw' });
  const works = import.meta.glob('/works/*.mdx', { as: 'raw' });
  const content = import.meta.glob('/content/*.mdx', { as: 'raw' });
  
  let fileMap = {};
  if (directory === 'blogs') {
    fileMap = files;
  } else if (directory === 'services') {
    fileMap = services;
  } else if (directory === 'works') {
    fileMap = works;
  } else if (directory === 'content') {
    fileMap = content;
  }
  
  const items = [];
  
  for (const path in fileMap) {
    const content = await fileMap[path]();
    const { frontmatter, content: body } = parseFrontmatter(content);
    const slug = path.split('/').pop().replace('.mdx', '');
    
    items.push({
      slug,
      ...frontmatter,
      content: body
    });
  }
  
  // Sort by date if available
  if (items[0]?.date) {
    items.sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return dateB - dateA;
    });
  }
  
  return items;
}

// Load a single MDX file by slug
export async function loadMDXFile(directory, slug) {
  const files = import.meta.glob('/blogs/*.mdx', { as: 'raw' });
  const services = import.meta.glob('/services/*.mdx', { as: 'raw' });
  const works = import.meta.glob('/works/*.mdx', { as: 'raw' });
  const content = import.meta.glob('/content/*.mdx', { as: 'raw' });
  
  let fileMap = {};
  if (directory === 'blogs') {
    fileMap = files;
  } else if (directory === 'services') {
    fileMap = services;
  } else if (directory === 'works') {
    fileMap = works;
  } else if (directory === 'content') {
    fileMap = content;
  }
  
  for (const path in fileMap) {
    if (path.includes(slug)) {
      const content = await fileMap[path]();
      const { frontmatter, content: body } = parseFrontmatter(content);
      return {
        slug,
        ...frontmatter,
        content: body
      };
    }
  }
  
  return null;
}
