<script>
	import { page } from '$app/stores';
	const langHeader = $page.path.split('/')[1].length > 2 ? $page.path.split('/')[2] : $page.path.split('/')[1]; // console.log(langHeader);
	const menuLangTitle = {
		fr: [ 'Accueil', 'Blogue', 'Profil', 'Docs' ],
		ja: [ 'ホーム', 'ブログ', 'プロフィール', 'ドックス' ],
		en: [ 'Home', 'Blog', 'Profile', 'Docs' ],
	}
	const logoWhite = '#fff'; const logoBlue = '#000e5f'; const logoRed = '#c70102';
	const actualLogoColours = {
		fr: [logoWhite, logoBlue, logoRed],
		ja: [logoRed, logoWhite, logoWhite],
		en: [logoBlue, logoWhite, logoRed],
	};
	const actualLangName = menuLangTitle[langHeader];
	const urlLangHeaderMenuLangTitle = [ {url: '/' + langHeader, name: actualLangName[0]},  {url: '/blog/' + langHeader, name: actualLangName[1]}, {url: '/profile/' + langHeader, name: actualLangName[2]}, {url: '/docs/' + langHeader, name: actualLangName[3]} ]
</script>

<header>
	<div class="corner">
		<a href="/{langHeader}" >
			<svg id="{langHeader}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path id="pathcircle" style="fill:{actualLogoColours[langHeader][0]}" d="M17.501.5C8.111.5.5 8.111.5 17.5s7.611 17 17 17c9.39 0 17-7.611 17-17S26.89.5 17.501.5Z"/><path
				id="pathf" style="fill:{actualLogoColours[langHeader][1]}" d="M20.125 2.921q-.349.25-.913.697-.548.448-1.112.88-.564.415-1.045.73-.481.316-.68.316-.266 0-.532-.299-.248-.315-.547-.68-.282-.382-.63-.68-.333-.316-.764-.316-.697 0-1.178.664-.482.647-.814 1.642-.315.996-.497 2.175-.183 1.178-.299 2.24l-.099.78h4.131l.449.58q-.166.233-.498.564-.316.332-.68.665-.349.314-.681.58-.332.265-.498.348-.183-.464-.714-.597-.514-.15-1.576-.15h-.166l-1.128 9.825q-.216 1.825-.946 3.518-.714 1.71-1.742 3.17-1.013 1.476-2.24 2.638-1.212 1.178-2.44 1.925l-.68-1.41q.83-.465 1.51-1.41.662-.947 1.16-2.175.516-1.212.847-2.606.332-1.393.482-2.754l1.244-10.72H4.526l-.381-.648 2.173-1.343h.747q.166-1.328.464-2.556.316-1.228.814-2.323.498-1.095 1.244-2.041.747-.963 1.792-1.743.896-.648 1.843-1.095.945-.448 1.974-.448.813 0 1.593.299.78.282 1.428.647.663.365 1.16.697.499.332.747.414z"/><path
				id="pathv" style="fill:{actualLogoColours[langHeader][2]}" d="M32.696 15.03q0 .674-.484 1.873-.484 1.2-1.578 3.199-1.095 1.999-2.862 4.944-1.768 2.926-4.356 7.07-.19.106-.673.359-.485.231-1.032.484l-1.051.525q-.505.253-.716.337l-.841-.8q-.232-1.788-.59-3.87-.358-2.105-.736-4.104-.379-2.02-.758-3.704-.379-1.683-.673-2.651-.168-.568-.358-.905-.189-.337-.4-.526-.189-.19-.379-.231-.189-.064-.378-.064-.21 0-.547.084-.337.063-.674.17-.379.104-.841.25l-.505-1.409q.884-.442 1.893-.926 1.032-.505 1.957-.904.926-.421 1.663-.695.736-.273 1.051-.273.611 0 .99.61.4.59.841 2.062.169.547.4 1.578.232 1.01.463 2.273.253 1.263.506 2.61.252 1.346.442 2.503.21 1.158.336 2.02.147.842.168 1.115 1.452-2.293 2.336-4.06.905-1.79 1.41-3.052.505-1.283.673-2.062.168-.8.168-1.094 0-1.031-1.157-1.031-.358 0-.715.083-.337.064-.8.233l-.463-1.369q.652-.358 1.578-.778.947-.442 1.874-.8.946-.378 1.767-.609.841-.253 1.326-.232.736.021 1.22.4.505.358.505 1.367z"/></svg>
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			{#each urlLangHeaderMenuLangTitle as { url, name }}
			<li class:active={$page.path === url}><a sveltekit:prefetch href={url}>{name}</a></li>
			{/each}
			<li><a href="https://twitter.com/bf7afa37fa974cd"><svg aria-hidden="true" viewBox="0 0 300 300"><path style="fill:black" d="M250 87.974a82.023 82.023 0 0 1-23.566 6.461c8.471-5.078 14.978-13.119 18.041-22.701a82.14 82.14 0 0 1-26.057 9.957c-7.484-7.975-18.148-12.957-29.95-12.957-22.66 0-41.033 18.371-41.033 41.031 0 3.216.363 6.348 1.062 9.351-34.102-1.711-64.336-18.047-84.574-42.872a40.837 40.837 0 0 0-5.556 20.628c0 14.236 7.244 26.795 18.254 34.153a40.87 40.87 0 0 1-18.585-5.132c-.004.171-.004.343-.004.516 0 19.88 14.144 36.464 32.915 40.234a41.076 41.076 0 0 1-18.53.703c5.222 16.301 20.375 28.165 38.331 28.495-14.043 11.006-31.735 17.565-50.96 17.565-3.312 0-6.578-.194-9.788-.574 18.159 11.643 39.727 18.437 62.899 18.437 75.473 0 116.746-62.524 116.746-116.747 0-1.779-.04-3.548-.119-5.309A83.362 83.362 0 0 0 250 87.974z"/></svg></a></li>
			<li><a href="https://github.com/tidiview/"><svg aria-hidden="true" viewBox="0 0 16 16" version="1.1">
				<path style="fill:black" fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
			</svg></a></li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
		<ul>
		</ul>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner svg {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
	svg#fr:hover path#pathcircle {fill: #c70102 !important}
	svg#fr:hover path#pathf {fill: #fff !important}
	svg#fr:hover path#pathv {fill: #000e5f !important}
	svg#ja:hover path#pathcircle {fill: #fff !important}
	svg#ja:hover path#pathf {fill: #c70102 !important}
	svg#ja:hover path#pathv {fill: #c70102 !important}
	svg#en:hover path#pathcircle {fill: #c70102 !important}
	svg#en:hover path#pathf {fill: #000e5f !important}
	svg#en:hover path#pathv {fill: #fff !important}
</style>
