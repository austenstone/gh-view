'use client'

import { useState, useCallback } from 'react'
import MultiSelectAutocomplete, { AutocompleteItem } from '@/components/multi-select-autocomplete'


const sampleItems: AutocompleteItem[] = [
  { text: 'Components', id: '0' },
  { text: 'Figma', id: '1' },
  { text: 'Design patterns', id: '2' },
  { text: 'Design tokens', id: '3' },
  { text: 'Icons', id: '4' },
  { text: 'Rails', id: '5' },
  { text: 'React', id: '6' },
  { text: 'TypeScript', id: '7' },
  { text: 'Next.js', id: '8' },
  { text: 'Supabase', id: '9' },
]

export default function AutocompleteDemoPage() {
  const [selectedItems, setSelectedItems] = useState<AutocompleteItem[]>([])

  const handleSelectionChange = useCallback((items: AutocompleteItem[]) => {
    console.log('Selected items:', items)
    setSelectedItems(items)
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Multi-Select Autocomplete Demo 🎯</h1>
      <p>Interactive example of the multi-select autocomplete component</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Basic Example</h2>
        <p>Select multiple items from the list below:</p>
        
        <MultiSelectAutocomplete
          items={sampleItems}
          label="Select Topics"
          placeholder="Search for topics..."
          helperText="Choose multiple topics that interest you"
          onSelectionChange={handleSelectionChange}
        />
        
        <div style={{ marginTop: '1rem' }}>
          <h3>Selected Items:</h3>
          {selectedItems.length === 0 ? (
            <p>No items selected</p>
          ) : (
            <ul>
              {selectedItems.map(item => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Pre-selected Example</h2>
        <p>This example has some items already selected:</p>
        
        <MultiSelectAutocomplete
          items={sampleItems}
          label="Tech Stack"
          placeholder="Search technologies..."
          defaultSelectedItems={[
            { text: 'React', id: '6' },
            { text: 'TypeScript', id: '7' },
          ]}
          helperText="Select your preferred technologies"
        />
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Required Field</h2>
        <p>This field is marked as required:</p>
        
        <MultiSelectAutocomplete
          items={sampleItems}
          label="Required Selection"
          placeholder="You must select at least one..."
          required
          helperText="This field is required"
        />
      </div>
    </div>
  )
}
