<script>
	import { page } from '$app/stores';
    let path = $page.path; console.log(path)
    let section = path.split('/')[1];
    let pathLevelDepth = path == undefined ? 0 : path.split('/').length;
    let breadrumbArray = section === 'docs' ? [ {name: rootTitle, url: rootUrl}, {name: sectionTitle, url: sectionUrl}, {name: pathLevelOneTitle, url: pathLevelOneUrl}, {name: pathLevelTwoTitle, url: pathLevelTwoUrl}, {name: pathLevelThreeTitle, url: pathLevelThreeUrl} ] : [ {name: rootTitle, url: rootUrl}, {name: sectionTitle, url: sectionUrl}, {name: pathLevelOneTitle, url: pathLevelOneUrl}, {name: pathLevelTwoTitle, url: pathLevelTwoUrl}, {name: pathLevelThreeTitle, url: pathLevelThreeUrl} ];
</script>

<nav aria-label="breadcrumb">
    <ul class="breadcrumb">
        {#each breadrumbArray as { name, url }, i}
        {#if i < pathLevelDepth + 2}
            <li><a href={url}>{name}</a></li>
        {/if}
        {/each}
    </ul>
</nav>
