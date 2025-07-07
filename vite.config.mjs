import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import path from 'node:path';
import {fileURLToPath} from 'url';
import * as fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getComponentEntries = () => {
	const srcDir = path.resolve(__dirname, 'src');
	const componentsDir = path.resolve(srcDir, 'components');
	const entries = {
		'': path.join(srcDir, 'index.ts'),
	};

	fs.readdirSync(componentsDir, {withFileTypes: true})
		.filter((dirent) => dirent.isDirectory())
		.forEach((dir) => {
			const componentPath = path.join(componentsDir, dir.name, 'index.ts');
			if (fs.existsSync(componentPath)) {
				entries[`components/${dir.name}`] = componentPath;
			}
		});

	return entries;
};

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			// include: Object.values(getComponentEntries()),
			exclude: ['node_modules/**', 'src/components/**/*.stories.tsx'],
		}),
		viteStaticCopy({
			targets: [
				{
					src: 'src/styles/theme.css',
					dest: '',
				},
			],
		}),
	],
	build: {
		lib: {
			entry: getComponentEntries(),
			name: 'UiKit',
			fileName: (format, entryName) => `${entryName ? `${entryName}/index` : 'index'}.${format}.js`,
		},
		cssCodeSplit: false,
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				chunkFileNames: '[name].[format].js',
				globals: {
					'react': 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
