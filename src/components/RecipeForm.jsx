import { useState } from 'react';
import { CATEGORIES, CUISINES } from '../utils/api';

const empty = {
  image: '',
  title: '',
  ingredients: '',
  instructions: '',
  cuisineType: 'Italian',
  prepTime: '',
  categories: [],
};

// Shared by Add Recipe and the Update modal
export default function RecipeForm({ initial, onSubmit, submitLabel, submitting, showLikeCount = false }) {
  const [form, setForm] = useState({ ...empty, ...initial });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggleCategory = (cat) =>
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat) ? f.categories.filter((c) => c !== cat) : [...f.categories, cat],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, prepTime: Number(form.prepTime) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <label htmlFor="image" className="field-label">Image URL</label>
        <input id="image" type="url" className="field" placeholder="https://… link to a photo of the dish" value={form.image} onChange={set('image')} />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="title" className="field-label">Title</label>
        <input id="title" required className="field" placeholder="e.g. Grandma’s chicken korma" value={form.title} onChange={set('title')} />
      </div>

      <div>
        <label htmlFor="ingredients" className="field-label">Ingredients</label>
        <textarea id="ingredients" required rows={7} className="field" placeholder={'One per line\n2 cups basmati rice\n1 tbsp ghee'} value={form.ingredients} onChange={set('ingredients')} />
      </div>

      <div>
        <label htmlFor="instructions" className="field-label">Instructions</label>
        <textarea id="instructions" required rows={7} className="field" placeholder={'One step per line\nRinse the rice until the water runs clear.'} value={form.instructions} onChange={set('instructions')} />
      </div>

      <div>
        <label htmlFor="cuisine" className="field-label">Cuisine type</label>
        <select id="cuisine" className="field" value={form.cuisineType} onChange={set('cuisineType')}>
          {CUISINES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="prep" className="field-label">Preparation time (minutes)</label>
        <input id="prep" type="number" min="1" required className="field" placeholder="30" value={form.prepTime} onChange={set('prepTime')} />
      </div>

      <fieldset className="md:col-span-2">
        <legend className="field-label">Categories</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const on = form.categories.includes(cat);
            return (
              <label
                key={cat}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${on ? 'border-basil bg-basil text-onbasil' : 'border-line text-ink hover:border-basil'}`}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleCategory(cat)} />
                {cat}
              </label>
            );
          })}
        </div>
      </fieldset>

      {showLikeCount && (
        <div>
          <label htmlFor="likes" className="field-label">Like count</label>
          <input id="likes" className="field cursor-not-allowed opacity-70" value={0} readOnly />
        </div>
      )}

      <div className="md:col-span-2">
        <button type="submit" className="btn-primary w-full py-3 text-base" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
