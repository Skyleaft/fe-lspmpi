<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type Quill from 'quill';

	interface Props {
		value?: string;
		placeholder?: string;
		theme?: 'snow' | 'bubble';
		readOnly?: boolean;
		onTextChange?: (content: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = 'Tulis artikel Anda di sini...',
		theme = 'snow',
		readOnly = false,
		onTextChange
	}: Props = $props();

	let editorElement: HTMLElement;
	let quillInstance: Quill | null = null;

	onMount(async () => {
		// Import Quill CSS
		await import('quill/dist/quill.snow.css');
		
		const { default: Quill } = await import('quill');
		
		quillInstance = new Quill(editorElement, {
			theme,
			placeholder,
			readOnly,
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					[{ align: [] }],
					['link', 'image'],
					['clean']
				]
			}
		});

		// Set initial value
		if (value) {
			quillInstance.root.innerHTML = value;
		}

		// Listen for text changes
		quillInstance.on('text-change', () => {
			const content = quillInstance?.root.innerHTML || '';
			value = content;
			if (onTextChange) {
				onTextChange(content);
			}
		});
	});

	// Update editor content when value prop changes
	$effect(() => {
		if (quillInstance && value !== quillInstance.root.innerHTML) {
			quillInstance.root.innerHTML = value;
		}
	});



	onDestroy(() => {
		if (quillInstance) {
			quillInstance = null;
		}
	});
</script>

<div class="quill-editor" bind:this={editorElement}></div>

<style>
	.quill-editor {
		min-height: 300px;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		overflow: hidden;
		background: white;
	}
</style>
