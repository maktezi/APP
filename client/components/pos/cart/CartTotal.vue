<template>
    <div
        class="flex justify-end items-center m-auto bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
    >
        <div class="flex flex-col justify-center items-end">
            <p class="text-black dark:text-gray-300 text-md font-medium">
                Amount:
                <span>₱ {{ currencyFormat(totalAmount) }}</span>
            </p>
            <p class="text-black dark:text-gray-300 text-sm font-medium">
                Tax (12%): <span>₱ {{ currencyFormat(totalTax) }}</span>
            </p>
            <p class="text-black dark:text-gray-300 text-xl font-bold">
                Total:
                <span>₱ {{ currencyFormat(totalAmountWithTax) }}</span>
            </p>
        </div>
    </div>
</template>
