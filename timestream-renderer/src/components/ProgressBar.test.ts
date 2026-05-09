import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressBar from './ProgressBar.vue';

describe('ProgressBar.vue', () => {
  it('renders a progress bar with the correct width', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        progress: 50
      }
    });
    
    const fill = wrapper.find('.bar-fill');
    expect(fill.exists()).toBe(true);
    expect(fill.attributes('style')).toContain('width: 50%');
  });

  it('displays the label when provided', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        progress: 25,
        label: 'Test Label'
      }
    });
    
    const label = wrapper.find('.lane-label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Test Label');
  });

  it('displays the count when provided', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        progress: 75,
        count: '3/4'
      }
    });
    
    const count = wrapper.find('.count-label');
    expect(count.exists()).toBe(true);
    expect(count.text()).toBe('3/4');
  });

  it('applies the correct variant class', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        progress: 10,
        variant: 'secondary'
      }
    });
    
    const fill = wrapper.find('.bar-fill');
    expect(fill.classes()).toContain('secondary');
    expect(fill.classes()).not.toContain('primary');
  });

  it('defaults to primary variant if not specified', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        progress: 10
      }
    });
    
    const fill = wrapper.find('.bar-fill');
    expect(fill.classes()).toContain('primary');
  });
  
  it('renders slot content', () => {
    const wrapper = mount(ProgressBar, {
      props: { progress: 0 },
      slots: {
        default: '<span class="test-slot">Slot Content</span>'
      }
    });
    
    expect(wrapper.find('.test-slot').exists()).toBe(true);
    expect(wrapper.text()).toContain('Slot Content');
  });
});
