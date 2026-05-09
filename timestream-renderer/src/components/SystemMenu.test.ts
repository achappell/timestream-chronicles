import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SystemMenu from './SystemMenu.vue';

describe('SystemMenu.vue', () => {
  it('renders control buttons initially', () => {
    const wrapper = mount(SystemMenu);
    
    expect(wrapper.text()).toContain('SYSTEM CONTROL PROTOCOLS');
    expect(wrapper.text()).toContain('MANUAL MATERIALIZATION (SAVE)');
    expect(wrapper.text()).toContain('EXPORT TIMELINE (STRING)');
    expect(wrapper.text()).toContain('IMPORT TIMELINE (STRING)');
    expect(wrapper.text()).toContain('HARD RESET TIMELINE');
  });

  it('emits save event when manual save is clicked', async () => {
    const wrapper = mount(SystemMenu);
    
    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click');
    
    expect(wrapper.emitted('save')).toBeTruthy();
  });

  it('emits export-save event when export is clicked', async () => {
    const wrapper = mount(SystemMenu);
    
    const buttons = wrapper.findAll('button');
    await buttons[1].trigger('click');
    
    expect(wrapper.emitted('export-save')).toBeTruthy();
  });

  it('emits hard-reset event when reset is clicked', async () => {
    const wrapper = mount(SystemMenu);
    
    const buttons = wrapper.findAll('.danger');
    await buttons[0].trigger('click');
    
    expect(wrapper.emitted('hard-reset')).toBeTruthy();
  });

  it('shows import console when import is clicked', async () => {
    const wrapper = mount(SystemMenu);
    
    const buttons = wrapper.findAll('button');
    await buttons[2].trigger('click'); // IMPORT TIMELINE
    
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.text()).toContain('PASTE & IMPORT');
    expect(wrapper.text()).toContain('CANCEL');
  });

  it('cancels import and returns to control grid', async () => {
    const wrapper = mount(SystemMenu);
    
    const buttons = wrapper.findAll('button');
    await buttons[2].trigger('click'); // IMPORT TIMELINE
    
    const cancelBtn = wrapper.findAll('.import-actions button')[1];
    await cancelBtn.trigger('click');
    
    expect(wrapper.find('textarea').exists()).toBe(false);
    expect(wrapper.text()).toContain('MANUAL MATERIALIZATION (SAVE)');
  });

  it('emits import-save with payload when text is entered and imported', async () => {
    const wrapper = mount(SystemMenu);
    
    // Open import console
    const buttons = wrapper.findAll('button');
    await buttons[2].trigger('click'); 
    
    // Enter string
    const textarea = wrapper.find('textarea');
    await textarea.setValue('dGVzdHN0cmluZw==');
    
    // Click PASTE & IMPORT
    const importBtn = wrapper.findAll('.import-actions button')[0];
    await importBtn.trigger('click');
    
    expect(wrapper.emitted('import-save')).toBeTruthy();
    expect(wrapper.emitted('import-save')![0]).toEqual(['dGVzdHN0cmluZw==']);
    expect(wrapper.find('textarea').exists()).toBe(false); // Closes on success
  });

  it('alerts and does not emit if import string is empty', async () => {
    // Mock global alert
    window.alert = vi.fn();
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(SystemMenu);
    
    const buttons = wrapper.findAll('button');
    await buttons[2].trigger('click'); 
    
    const importBtn = wrapper.findAll('.import-actions button')[0];
    await importBtn.trigger('click'); // Empty string
    
    expect(wrapper.emitted('import-save')).toBeFalsy();
    expect(alertMock).toHaveBeenCalledWith('PLEASE ENTER A VALID TIMELINE STRING TO IMPORT');
    
    alertMock.mockRestore();
  });
});
