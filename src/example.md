---
title: Example Project
description: A demonstration project showing the markdown format for the portfolio.
thumbnail: /assets/images/fishsense.png
date: 2024-06-20
tags: [web development, vue, typescript]
---

# Example Project

This is an example project demonstrating how to create project entries for your portfolio.

## How to Add a New Project

1. Create a new `.md` file in the `src/projects/` folder
2. Add frontmatter at the top with project metadata
3. Write your project content in markdown below the frontmatter

## Frontmatter Format

```yaml
---
title: Your Project Title
description: A brief description of your project
thumbnail: /path/to/thumbnail/image.jpg
date: 2024-01-15
tags: [tag1, tag2, tag3]
---
```

## Markdown Content

Below the frontmatter, you can write any markdown content:

- **Bold text** and *italic text*
- Lists (like this one)
- Code blocks
- Images
- Links
- And more!

### How to Insert Images

Images should be placed in the `public/assets/images/` folder. Then reference them like this:

```markdown
![Alt text description](/assets/images/your-image.jpg)
```

**Example image:**

![FishSense Device](/assets/images/fishsense.png)

You can also add a caption as italic text right below the image:

*This is a caption describing the image above*

### Different Image Formats

Your images can be:
- `.jpg` or `.jpeg` - Best for photos
- `.png` - Best for images with transparency or screenshots  
- `.gif` - For animated images

**Example with a GIF:**

![Animated Example](/assets/images/v2-spinning.gif)

### Inline Image Sizing

If you need more control over image size, you can use HTML:

```html
<img src="/assets/images/icon.png" width="200" alt="Small icon" />
```

<img src="/assets/images/sevenSegment.png" width="300" alt="Seven Segment Display" />

### Code Examples

You can include code blocks with syntax highlighting:

```typescript
function hello(name: string): string {
  return `Hello, ${name}!`;
}

console.log(hello("World"));
```

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))
```

### Multiple Images in a Row

By default, markdown images stack vertically. To display images side-by-side, use HTML with a flex container:

```html
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px;">
    <img src="/assets/images/fishsense.png" alt="Image 1" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 0.5rem;">First image caption</p>
  </div>
  <div style="flex: 1; min-width: 250px;">
    <img src="/assets/images/fishsense-irl.jpg" alt="Image 2" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 0.5rem;">Second image caption</p>
  </div>
</div>
```

**Result:**

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px;">
    <img src="/assets/images/fishsense.png" alt="Image 1" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 0.5rem;">First image caption</p>
  </div>
  <div style="flex: 1; min-width: 250px;">
    <img src="/assets/images/fishsense-irl.jpg" alt="Image 2" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 0.5rem;">Second image caption</p>
  </div>
</div>

**For vertical stacking (default markdown):**

![Image 1](/assets/images/fishsense.png)
*First image caption*

![Image 2](/assets/images/fishsense-irl.jpg)
*Second image caption showing real-world implementation*

## Links

You can add links to external resources:

- [GitHub Repository](https://github.com)
- [Project Documentation](https://example.com)
- [Live Demo](https://example.com/demo)

## Conclusion

This system automatically loads all markdown files from the projects folder and displays them in the portfolio! Just create a new `.md` file with frontmatter and content, and it will appear automatically.

### Quick Tips for Images:

1. **Place images in:** `public/assets/images/`
2. **Reference with:** `/assets/images/filename.jpg`
3. **Use descriptive alt text** for accessibility
4. **Keep file sizes reasonable** (optimize large images)
5. **Supported formats:** JPG, PNG, GIF, SVG, WebP

