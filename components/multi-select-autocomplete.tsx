'use client'

import React from 'react'
import { Autocomplete, FormControl, TextInput, TextInputWithTokens } from '@primer/react'

export interface AutocompleteItem {
  text: string
  id: string
}

export interface Token {
  text: string
  id: string
}

export interface MultiSelectAutocompleteProps {
  /** The list of items to select from */
  items: AutocompleteItem[]
  /** Label for the autocomplete field */
  label: string
  /** Placeholder text for the input */
  placeholder?: string
  /** Initial selected items */
  defaultSelectedItems?: AutocompleteItem[]
  /** Callback when selection changes */
  onSelectionChange?: (selectedItems: AutocompleteItem[]) => void
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** Optional validation error message */
  errorMessage?: string
  /** Optional helper text */
  helperText?: string
  /** Whether to allow adding new items */
  allowNewItems?: boolean
  /** Custom filter function for items */
  filterFn?: (item: AutocompleteItem, inputValue: string) => boolean
  /** Maximum number of items that can be selected */
  maxItems?: number
  onMaxItemsReached?: () => void
}

export default function MultiSelectAutocomplete({
  items,
  label,
  placeholder = 'Search and select items...',
  defaultSelectedItems = [],
  onSelectionChange,
  required = false,
  disabled = false,
  errorMessage,
  helperText,
  allowNewItems = false,
  filterFn,
  maxItems,
  onMaxItemsReached
}: MultiSelectAutocompleteProps) {
  const [tokens, setTokens] = React.useState<Token[]>(
    defaultSelectedItems.map(item => ({ text: item.text, id: item.id }))
  )
  const [inputValue, setInputValue] = React.useState<string>('')
  
  // Notify parent of selection changes
  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedItems = tokens.map(token => ({
        text: token.text,
        id: token.id
      }))
      onSelectionChange(selectedItems)
    }
  }, [tokens]) // Removed onSelectionChange from dependency array to prevent infinite loop
  
  // Handle token removal
  const onTokenRemove: (tokenId: string | number) => void = (tokenId) => {
    setTokens(tokens.filter(token => token.id !== tokenId))
  }
  
  // Handle selection changes from autocomplete menu
  const handleSelectionChange = (newlySelectedItems: AutocompleteItem[] | AutocompleteItem) => {
    if (!Array.isArray(newlySelectedItems)) {
      return
    }
    
    // Check max items limit
    if (maxItems && newlySelectedItems.length > maxItems) {
      onMaxItemsReached?.()
      return
    }
    
    // Update tokens directly
    setTokens(newlySelectedItems.map(({ id, text }) => ({ id, text })))
  }
  
  const filteredItems = React.useMemo(() => {
    if (!inputValue) return items
    
    const lowercaseInput = inputValue.toLowerCase()
    
    return items.filter(item => {
      if (filterFn) {
        return filterFn(item, inputValue)
      }
      return item.text.toLowerCase().includes(lowercaseInput)
    })
  }, [items, inputValue, filterFn])
  
  const autocompleteId = React.useId()
  
  const shouldShowAddNewItem = allowNewItems && 
    inputValue && 
    !items.some(item => item.text.toLowerCase() === inputValue.toLowerCase())
  
  const addNewItemOption = shouldShowAddNewItem ? {
    text: inputValue,
    id: `new-${inputValue}`,
    handleAddItem: (selectedItem: AutocompleteItem) => {
      console.log('Added new item:', selectedItem)
      return selectedItem
    }
  } : undefined
  
  return (
    <FormControl required={required} disabled={disabled}>
      <FormControl.Label id={`${autocompleteId}-label`}>
        {label}
      </FormControl.Label>
      
      {helperText && (
        <FormControl.Caption>{helperText}</FormControl.Caption>
        // <div style={{ fontSize: '12px', color: '#656d76', marginTop: '4px' }}>
        //   {helperText}
        // </div>
      )}
      
      <Autocomplete>
        <Autocomplete.Input
          as={TextInputWithTokens}
          tokens={tokens}
          onTokenRemove={onTokenRemove}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value)
          }}
          disabled={disabled}
        />
        
        <Autocomplete.Overlay>
          <Autocomplete.Menu
            selectionVariant="multiple"
            selectedItemIds={tokens.map(token => token.id)}
            onSelectedChange={handleSelectionChange}
            aria-labelledby={`${autocompleteId}-label`}
            items={filteredItems}
            addNewItem={addNewItemOption}
          />
        </Autocomplete.Overlay>
      </Autocomplete>
      
      {errorMessage && (
        <FormControl.Validation variant="error">
          {errorMessage}
        </FormControl.Validation>
      )}
    </FormControl>
  )
}
