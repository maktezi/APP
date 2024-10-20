<?php

namespace App\GraphQL\Mutations;
use App\Models\Inventory;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class InventoryResolver
{
    /**
     * Create a new class instance.
     */
    /**
     * Subtract inventory stock for a product.
     *
     * @param null $rootValue
     * @param array $args
     * @param GraphQLContext $context
     * @param ResolveInfo $resolveInfo
     * @return Inventory
     * @throws Exception
     */
    public function reduceInventory($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $inventory = Inventory::where('product_id', $args['product_id'])->first();

        if (!$inventory) {
            throw new \Exception('Inventory not found for this product');
        }

        $inventory->qty -= $args['qty'];

        if ($inventory->qty < 0) {
            throw new \Exception('Not enough stock available');
        }

        $inventory->save();

        return $inventory;
    }
}
