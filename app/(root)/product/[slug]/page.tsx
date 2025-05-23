import ProductImages from '@/components/shared/product/product-images';
import ProductPrice from '@/components/shared/product/product-price';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
	const { slug } = await props.params;

	const product = await getProductBySlug(slug)
	if (!product) notFound();

	const {
		name,
		category,
		brand,
		rating,
		numReviews,
		price,
		description,
		stock,
		images
	} = product;

	return (
		<>
			<section>
				<div className="grid grid-cols-1 md:grid-cols-5">
					{/* Images Column */}
					<div className="col-span-2">
						<ProductImages images={images} />
					</div>
					{/* Details Column */}
					<div className="col-span-2 p-5">
						<div className="flex flex-col gap-6">
							<p>
								{brand} {category}
							</p>
							<h1 className="h3-bold">{name}</h1>
							<p>
								{rating} of {numReviews} Reviews
							</p>
							<div className='flex flex-col sm:flex-row sm:items-center gap-3'>
								<ProductPrice value={+price} className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2' />
							</div>
						</div>
						<div className="mt-10">
							<p className='font-semibold'>Description</p>
							<p>{description}</p>
						</div>
					</div>
					{/* Action Column */}
					<div>
						<Card>
							<CardContent className='p-4'>
								<div className="mb-2 flex justify-between">
									<div>Price</div>
									<div>
										<ProductPrice value={+price} />
									</div>
								</div>
								<div className="mb-2 flex justify-between">
									<div>Status</div>
									{stock > 0 ? (
										<Badge variant='outline'>In Stock</Badge>
									) : (
										<Badge variant='destructive'>Out of Stock</Badge>
									)}
								</div>
								{stock > 0 && (
									<div className="flex-center">
										<Button className='w-full'>
											Add To Cart
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	)
}

export default ProductDetailsPage