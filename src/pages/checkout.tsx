import React from 'react'
import Head from 'next/head'
import Header from '../../components/header'
import { useSelector } from 'react-redux'
import { selectBasektItems, selectBasketTotal } from '../../redux/basketSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import CheckoutProduct from '../../components/CheckoutProduct'
import Currency from 'react-currency-formatter';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { fetchPostJSON } from '../../utils/api-helpers'
import getStripe from '../../utils/get-stripe'


function Checkout() {
    const [loading, setLoading] = useState(false)

    const createCheckoutSession = async () => {
        setLoading(true)
        const checkoutSession: Stripe.checkout.Session = await fetchPostJSON("/api/checkout_sessions",
        {
            items: items,
        });
        // Internal Server Error
        if((checkoutSession as any).statusCode === 500) {
            console.error((checkoutSession as any).message)
            return;
        }

        // Redirect to checkout

        const stripe = await getStripe()
        const {error} = await stripe!.redirectToCheckout({
            sessionId: checkoutSession.id
        });

        console.warn(error.message)

        setLoading(false)

    }

    const basketTotal = useSelector(selectBasketTotal)

    const items = useSelector(selectBasektItems)
    const router = useRouter();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
        {} as {[key: string]: Product[]}
    )
    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item._id] = results[item._id] || []).push(item)
            return results;
        }, {} as {[key: string]: Product[]})
        setGroupedItemsInBasket(groupedItems)
    }, [items])
  return (
    <div className='min-h-screen overflow-hidden bg-[#e7ecee]'>
        <Head>
            <title>Bag - Apple</title>
        </Head>
        <Header/>
        <main className='mx-auto max-width-5xl pb-24'>
            <div className='px-5'>
                <h1 className='my-4 text-3xl font-semi
                lg:text-4xl'>{items.length > 0 ? 'Review your bag.' : 'Your bag is empty.'}</h1>
                <p className='my-4'>Free delivery and free returns.</p>
                {items.length === 0 && (
                    <Button title="Continue Shopping"
                    onClick={() => router.push('/')}
                    />
                )}
            </div>
            {items.length > 0 && (
                <div className='mx-5 md:mx-8'>
                   {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <CheckoutProduct id={key} key={key} items={items}/>
                   ))} 

                   <div className='my-12 mt-6 ml-auto max-w-3xl'>
                    <div className='divide-y divide-gray-300'>
                        <div className='pb-4'>
                            <div className='flex justify-between'>
                                <p>Subtotal</p>
                                <p><Currency quantity={basketTotal} currency='USD'/></p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping</p>
                                <p>Free</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-x-1 lg:flex-row '>
                                    Estimate tax for: {""}
                                    <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>Enter zip code
                                        <ChevronDownIcon className='w-6 h-6'/>
                                    </p>
                                </div>
                                <p>$ - </p>
                            </div>
                        </div>
                        <div className='flex justify-between pt-4 text-xl font-semibold'>
                            <h4>Total</h4>
                            <h4><Currency quantity={basketTotal} currency='USD'/></h4>
                        </div>
                    </div>
                    <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  How would you like to check out?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo. at 0% APR<sup className="-top-1">◊</sup>
                      </span>
                    </h4>
                    <Button title="Check Out with Apple Card Monthly Installments" />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      Pay in full
                      <span>
                        <Currency quantity={basketTotal} currency="USD" />
                      </span>
                    </h4>

                    <Button
                      noIcon
                    //   loading={loading}
                      title="Check Out"
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
            )}
        </main>
    </div>
  )
}

export default Checkout