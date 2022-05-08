<script>
	import { page } from '$app/stores';

	let langHeader = 'fr';
	let urlPartone = $page.url.pathname.split('/')[1]; // console.log(urlPartone);
	let urlPartwo = $page.url.pathname.split('/')[2]; // console.log(urlPartwo);
	let urlPartoneLength = urlPartone.length; // console.log(urlPartoneLength);
	 // console.log($page.url.pathname);
	if ( typeof $page.url.pathname === 'undefined' || $page.url.pathname === '/' || $page.url.pathname === '/about' || $page.url.pathname === '/todos' ){ langHeader = 'fr' } 
	else if ( typeof urlPartone === 'undefined' ){ langHeader = 'fr' } 
	else if ( typeof urlPartwo === 'undefined' ){ langHeader = urlPartone } 
	else if ( urlPartoneLength === 0 ){ langHeader = urlPartone } 
	else if ( urlPartoneLength > 2 ){ langHeader = urlPartwo } 
	else { urlPartone };
	// console.log(langHeader);

	const menuLangTitle = {
		fr: [ 'Accueil', 'Blogue', 'Profil', 'Docs' ],
		ja: [ 'ホーム', 'ブログ', 'プロフィール', 'ドックス' ],
		en: [ 'Home', 'Blog', 'Profile', 'Docs' ],
	}
	const actualLangName = menuLangTitle[langHeader];
	const urlLangHeaderMenuLangTitle = [ {url: '/' + langHeader, name: actualLangName[0]},  {url: '/blog/' + langHeader, name: actualLangName[1]}, {url: '/profile/' + langHeader, name: actualLangName[2]}, {url: '/docs/' + langHeader, name: actualLangName[3]} ]
	const menuSectionUrl = ['/', '/blog/', '/profile/', '/docs/'];
	const iconWebpLang = {
		fr: 'data:image/webp;base64,UklGRnwEAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSAYBAAABX8I2kqQ4zC6viSVX+Ud5BwQREVkIizAxjOgmVDH+RXy7YXIpSJ+xG6Go1myoEpMULyDWtm262rH1Gdu2nTxl999PnHs6iOh/4k18eDY0U9+OaykvFL6nfHdsRPHBXb7wg15w4V10RoVhEK9/WyqtfvEc3VJxFcDDNaXyxI17iYIsbjGDgn0A1yZFFfiOFB28aQqTdQq7YwqPOwpNjUJTo1DbUbgZUzisUVhNUZjwHCg6eNCgqIZrVKdAi+BWoCCPu+tE5YET9y8qr0N4FHnZUWn5g0f4xJy/T4VBAA97jx07nNkDP1g5J57abDlwD1QOfLeI4yWbseHZk6yONtp1M5r3//EGVlA4IFADAACwFQCdASogACAAPjEUiEKiISEYBAAgAwS2AE6Zb1x70b8YPxmrAPmP5gMgB4sG+AfqN1gHoAeVz7H37JfsB7S12BfK/xE/Yzsdu9PrFnBvqt84/Hj8kNYA/if9Y/IXJVf3z8kNUH/rH5M/zP1AOQH/in+H+4j4Fv67yffKv+g/Lv6B/4v/MP7V+Uf9R//X1AeuD0Dv0PHmlW83nLoPy2iMP5maUh8ZaPgG4oRvn8QPQVsryp7AAAD+/9jN3j6BRlcyKesT8LSOPbu6QOrfm2JNG2bjHMqd197UW82pATmtC/pHzW+qvpxWxfghUwGBb0960doyWkGbBESLKuKoDTouVHs1KkxWWrrFuY+lOMHzhWPaCsBb2Tt2902LwOdaZ9O/wp+ID1ecqwzKv7uzKgRDR11mhhJNeBlycX5VeqHhDSVMn3DGfwVHy2x4GKZNf7Ktub5a1nqx60/S7SxdU/KfH57aI1l2aXjsX2H1/xvwJ1U/Wpg7ubyjZEikgRv+TEU86f8+rBm3+6A4zyYqVFY2vVlDd2z+lrSDpoegifkQpjeRBvlRpUEoS6iTZnWp8fDpEALsbIaylC0fT3BQT9aWF625nOMwjyOrBvW9YBl9P/POGdLpjs/prtn0hG+J5tHOM2G7r4ffkraPPViwq738TZJgxzir7+/x37vrPSYeI/V/7Wv/5uPxDDnBR159e50eejl9Qg6sKeD5WRLmFsvgj/pxy/x2xNl8Y/y1W6U5KQw9mdUl86S7LAe0LDouYJanK3Iq6/jhETonZAxkfpKRH2NecjbylJRu+X6zyUvoKYVQOJxHm/vSjQoL0asnE5cxVF/Ez/5qXb4q0EpAbPCRNpcw8/pD5perkKA9NX8PvZMQQ4NxcgyCkjgZG6DdCvj4XVNs/E5GaXfEidhuy/SuBlYJtIKV4oldLKZJ+r7jqEP9fXRockCE8JAeq6OAV0XgHh6l7L5jU3sP2ox1NvSAQ+hv87NKpv5V2gxm55U7U9IYbuoa9TnXZzp8EHf2/iTC7aZf4YK8yZ0SfDDIBmyse1RHCMMTvtqHi1QTYSZ8ewDg+90ieyeYDISc5C3A9aI7g2czLdU0ed0HLNY9zNlML/tFali94M8NWAzlswAAAA==',
		ja: 'data:image/webp;base64,UklGRv4EAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSAUBAAABR8I4kqQ2zC4gb34q5Z8oNoeIyECxKKbsqCSz4OOnffFKWF6Yk443UVSi94QiZaWILgCxtm3T1Ylt2/qMnTy/t/uv6Dn3dBDR/6SQTO9iWLb5PCzbaRIof+kIkdcl+pAcG/igjxIUVjpDYJejYO0JoVuV/KUnBG9Z8hInCB+T5I7B6JNTNsB4Z8negDWljAyWlO6A2VqBuTiAuXuB+dDAVDUw1ReYjwOYuyWY8zaYjZQElpSiNVhLsks6GFqRnBEYQ3ITOwhv4+TVIXrPk28MwWuFfAUFk38IbLPki/7hNxrvS/igDeLk/8F3jJzsVEKItChSsN+NkC/Vmu8fmv3Yz5opCgEAVlA4INIDAAAQGwCdASogACAAPi0QhkKhoQ36AAwBYlsNwD+AfiB3AX4B+AF6AfwDAZtIA/gH4Na4D+c+TR/O+TL3t/JfYT/KP5V/UeEAGsAfwD8OZ4yhH+HgH4gcmfts2G2A8mPjb/RfZnvHvSA8wH7EfsB7JPqA/ID3AP1A6wD9QPYA/ZL0pf2l+B/9k/+B/iPgE/W65jeAPhB8meuG2Adrv7X+Mn5R6wB/F/7XjQ35Aakvxg3QHnG/2H2zfERmleY/+H7g38g/pH+o9Wb17ejGV41+v+PxvRTakwH3mF8uPVlwLAD0DAAA/v/xYhUpUA/Qet/uP8VQ/8H4VfKjQ7wnLsRviIyqPnHJg78BM96Jf4VgvndBmuXGMVWuCp+9ZOd6el2zHhsE6vTX8DerlH+YiwyP8oD/Q1C8nePn74eS7Kyc0VXIqhSqh2tfr2t1dto+1syWIhQheRu85/6CGhHVn/UuDKEX4Z03cfSuan+c7ezVlP/T//2EnTGc9fY03iLYuh0IPjQghI7dvi2T76H/9p9rtfjtbB4gomUeQezrbt3iPnSMP4/lAeBW31nsc52yKHvTFH/EK36LWn9rSHmIz9buGpekGMMfWE4UHpn6RkP/a0MyiSBorAcrtHUS8atulnjc62x8MusJvTO4wBe6QnOcydDNGVvVcL91IaM0gflQ0/f8VEBlpQdZaVnqRzsegbe3gcWK+781uL3vuxFfm5T/K9vP735gI3x3fntwyzXPajnwWh3buoSRyL6Fb9F5S7g2f/+3v21eKauqe+RtsUmEUfRg5GujNPsoDoC3Yz+jL//+Umf/baf/EfZ//xhv/6NWVv+uxXovH1KP+wHKsNoPVuOfBVKdCrUMEuBnQpEEwY+r1P32Xf/7NEGx09w2cI01qhiRRfID4YbxtsdW+Pilfwlncj92tEeGPByDYHTmw1p+nmiK+5wnJfZrCRESyIf83E/lCEJVI3c9aA9USMl31Bvcrf3836m03mmT2mrRQK45xTC8c6DrbCUXdFIPRzqIkA678Gf56dJ2CKr+nRvcSHkA9Av+RkBf3XdgphF34AnuXMav9Dok7Q/ttJaf8ptdf8U3mGgnI30m8Srxlu7q8HEKtZlQgbkvnvvY465eA1EjpiymH9Dh/OOmXb2h96Qx2huVvuDGZwSXb+nDkrMFFVILAH0Ce5tOjLSG/H9AXmGH/tb9jlZcrjDMS7FW36ijZ3Z9WEuUq6X8GP/yhXwEUGcW8FAvGH3erz2hJdYKN+Gb3NM/K6SlW+CCCWLrt/Tf7+AIGQSlLHE6eRKMtcnFdBMuAAA=',
		en: 'data:image/webp;base64,UklGRrIDAABXRUJQVlA4TKYDAAAvH8AHELcGsZEkRVIcn/+O8j32VD04AcFtI0eS7N6c7v7/zc3bXWVHbSRJUtRoCCx/jvueqyLg1ratWpnnvu8fd8k1/ikRBVCFVUBMH5ZRADWQQiXuzj11AJoSVDABCpgAU6ABPbADtsAINGAGNE1TDb7napJSkwbpzFrprFKTmev9/VqldH8zv1Y66aT1/nqkk05a399v92t5mdLjfklpm7a/yqv39yOdlF7PW4MmDTaaO3D+9ryOVmmWPt6PdDY+Tj7ez96s1SSVtF7PW4OP9+N7rsTRx+u9/vx+Zq2Za5UapJVOk1lqek85bNBklYJkCMAbSPADEiRI8AISJKjgCySohfYWAgRN7dgesZbJ4g6GOMqG+S9HCbRhlCkwytzjzBPbGVqFFUU5tjC5hTZaKAQooI0S/G/gFzNZGIDABLgt9FBFgZnZDm7O5UW44sCvzpHj8+Ecv9T/UIag5xfFfhEohO4/BA7FSB2G/TJSi2H/4VAYdTgEm2WrOhz/FwaFwyF0iGArGyE1nF6cjhAoNiIYoRC6XzaL0N36Nw11KwqBQoCEbdvOr53Q8zTbXrNtb83M+P/vbNu2bTcrzWhea858vtDv90sR/Z8AmtRXj50pz0pKCB+nyLKjy5mX7TcFXAoix1aSZrGVVQ3NAdjmFo8h2sNmC6+6ZrSIN96AqnfgqGIccJL5OHDuiDU0HeNGEewEyxW8wBhjtA/SKPEBzjOvxZi9itVSAexi3jE2pKsE2AHYwLx/HGwjFZmAycHFzJsPHDhwcwwoULjg8kpWX286FmciigDMr5xm5rMX9pqh+tVrvVrNi7anCCOKBwAjZjYFbn8dFnkAQPe4fURk0D+RKENxnHkpGr6L8jOg/y3KHn0mUY5iH7Mh7v953yUifTqgtbldRD6hkChbsZN5GwDcERGpA4AWkeEGRYZiE/NuBTpFpFHRJvIFyCSKV6xmPqjyUUTeAND1yFA9kEgUDsBqIfMplSYR6QDwROQtgFAicgWuM/NFlQYR6dcDv6SvEnAjIsoDLjHzLRXdgIjU4KHIcwD5igA7nGA2hPpPEXmk+yv/dIBtlIJysZv5sMY7EXnZIsP3ACSTarHvGl5irNEqIt965AMA91I12s58CJp3RdlbAdiHkOZsXmelVaXSCDjFkuYMg3l7PLXQLSIdengFk+a0OfNnUnG6rcYPkc5au5RS0p41dzoRUVS+q8qz/41++QE02qlTSDMsMa+wMK8ojCY1'
	};
</script>

<svelte:head>
	<link rel="icon" sizes="32x32" type="image/x-icon" href={iconWebpLang[langHeader]}>
</svelte:head>

<header>
	<div class="corner">
		<a href="/{langHeader}" >
			<svg id="{langHeader}" viewBox="0 0 32 32" aria-hidden="true"><path id="pathcircle" d="M16 1.371C7.92 1.371 1.372 7.921 1.372 16c0 8.08 6.55 14.629 14.629 14.629 8.08 0 14.629-6.55 14.629-14.629C30.629 7.92 24.08 1.371 16 1.371z"/><path id="pathf" d="M18.259 3.455q-.3.215-.786.6-.471.385-.957.757-.485.357-.899.628-.414.272-.585.272-.229 0-.458-.257-.213-.272-.47-.586-.243-.328-.543-.585-.286-.272-.657-.272-.6 0-1.014.572-.415.556-.7 1.413-.271.857-.428 1.871-.157 1.014-.257 1.928l-.085.671h3.554l.387.499q-.143.2-.429.485-.272.286-.585.573-.3.27-.586.499-.286.228-.428.3-.158-.4-.615-.515-.442-.129-1.356-.129h-.143l-.97 8.455q-.186 1.57-.815 3.027-.614 1.472-1.499 2.728-.871 1.27-1.927 2.27-1.043 1.014-2.1 1.656l-.585-1.213q.714-.4 1.3-1.213.57-.815.998-1.872.444-1.043.729-2.242t.414-2.37l1.07-9.225H4.837l-.328-.557 1.87-1.156h.643q.142-1.143.399-2.2.272-1.056.7-1.998.429-.943 1.07-1.757.644-.828 1.543-1.5.77-.557 1.586-.942.813-.385 1.698-.385.7 0 1.371.257.671.243 1.229.557.57.314.998.6.43.285.643.356z"/><path id="pathv" d="M29.076 13.875q0 .58-.416 1.611-.417 1.033-1.358 2.753-.942 1.72-2.463 4.254-1.521 2.518-3.748 6.084-.164.091-.58.309-.417.199-.887.417l-.905.451q-.434.218-.616.29l-.724-.688q-.2-1.539-.507-3.33-.308-1.812-.634-3.532-.326-1.738-.652-3.187-.326-1.448-.579-2.281-.145-.489-.308-.779-.163-.29-.344-.453-.163-.163-.326-.198-.163-.056-.326-.056-.18 0-.47.073-.29.054-.58.146-.326.09-.724.215l-.435-1.212q.761-.38 1.63-.797.887-.435 1.683-.778.797-.362 1.431-.598.634-.235.905-.235.526 0 .852.525.344.508.723 1.774.146.471.345 1.358.2.87.398 1.956.218 1.087.435 2.246.217 1.158.38 2.154.181.996.29 1.738.126.725.144.96 1.25-1.974 2.01-3.494.78-1.54 1.214-2.626.434-1.104.579-1.775.145-.688.145-.941 0-.887-.996-.887-.308 0-.615.071-.29.055-.689.2l-.398-1.177q.56-.308 1.358-.67.815-.38 1.612-.688.814-.326 1.52-.524.725-.218 1.142-.2.633.018 1.05.344.434.308.434 1.177z"/></svg>
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			{#each urlLangHeaderMenuLangTitle as { url, name }}
			<li class:active={$page.url.pathname === url}><a sveltekit:prefetch href={url}>{name}</a></li>
			{/each}
			<li><a href="https://twitter.com/bf7afa37fa974cd"><svg aria-hidden="true" viewBox="0 0 300 300"><path style="fill:black" d="M250 87.974a82.023 82.023 0 0 1-23.566 6.461c8.471-5.078 14.978-13.119 18.041-22.701a82.14 82.14 0 0 1-26.057 9.957c-7.484-7.975-18.148-12.957-29.95-12.957-22.66 0-41.033 18.371-41.033 41.031 0 3.216.363 6.348 1.062 9.351-34.102-1.711-64.336-18.047-84.574-42.872a40.837 40.837 0 0 0-5.556 20.628c0 14.236 7.244 26.795 18.254 34.153a40.87 40.87 0 0 1-18.585-5.132c-.004.171-.004.343-.004.516 0 19.88 14.144 36.464 32.915 40.234a41.076 41.076 0 0 1-18.53.703c5.222 16.301 20.375 28.165 38.331 28.495-14.043 11.006-31.735 17.565-50.96 17.565-3.312 0-6.578-.194-9.788-.574 18.159 11.643 39.727 18.437 62.899 18.437 75.473 0 116.746-62.524 116.746-116.747 0-1.779-.04-3.548-.119-5.309A83.362 83.362 0 0 0 250 87.974z"/></svg></a></li>
			<li><a href="https://github.com/tidiview/"><svg aria-hidden="true" viewBox="0 0 16 16" version="1.1"><path style="fill:black" fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
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

	svg#fr path#pathcircle {fill: #fff}
	svg#fr path#pathf {fill: #000e5f}
	svg#fr path#pathv {fill: #c70102}
	svg#ja path#pathcircle {fill: #c70102}
	svg#ja path#pathf {fill: #fff}
	svg#ja path#pathv {fill: #fff}
	svg#en path#pathcircle {fill: #000e5f}
	svg#en path#pathf {fill: #fff}
	svg#en path#pathv {fill: #c70102}

	svg#fr:hover path#pathcircle {fill: #c70102}
	svg#fr:hover path#pathf {fill: #fff}
	svg#fr:hover path#pathv {fill: #000e5f}
	svg#ja:hover path#pathcircle {fill: #fff}
	svg#ja:hover path#pathf {fill: #c70102}
	svg#ja:hover path#pathv {fill: #c70102}
	svg#en:hover path#pathcircle {fill: #c70102}
	svg#en:hover path#pathf {fill: #000e5f}
	svg#en:hover path#pathv {fill: #fff}
</style>
