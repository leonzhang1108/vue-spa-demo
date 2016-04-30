<template>
    <nav class="zpagenav" >
    <ul class="pagination">
        <li  @click="setPage(unit.page)" track-by="$index" v-for="unit in units" class="page-item {{unit.class}}" :disabled="unit.disabled">
            <a class="page-link" href="javascript:void(0);" aria-label="{{unit.ariaLabel}}">
                <span v-if="unit.isPager" aria-hidden="true">{{{unit.html}}}</span>
                <span v-else>{{{unit.html}}}</span>
                <span v-if="unit.isPager" class="sr-only">{{{unit.srHtml}}}</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
