<template>

    <nav class="border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col-reverse h-32 sm:h-16 sm:flex-row sm:justify-between">

                <div class="flex h-16 px-2 lg:px-0">
                    <div class="-my-px ml-6 flex space-x-8">
                        <a href="#" class="inline-flex items-center border-b-2 border-orange-700 px-1 pt-1 text-sm font-medium text-gray-900" aria-current="page">Main</a>
                        <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Side</a>
                        <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Supper</a>
                        <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Dessert</a>
                    </div>
                </div>

                <div class="flex h-16 mt-8 sm:mt-auto flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                    <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
                        <input type="search" name="search" class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-700 sm:text-sm/6" placeholder="Search">
                        <svg class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    </nav>

</template>