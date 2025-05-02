import React, { useState } from 'react'
import { useAppSelector } from '../../store/typedReduxHooks';
import { useGetUserOfferList } from './https/useGetUserOfferList';
import useAddToCartMutation from '../DiscoverMore/http/useAddToCartMutation';
import Loader from './Loader';

interface Offer {
  _id: string;
  type: string;
  artwork: {
    _id: string;
    artworkName: string;
    media: Record<string, unknown>;
  };
  user: {
    _id: string;
    artistName: string;
    nickName: string;
  };
  offerprice: number;
  createdAt: string;
  isAccepted?: boolean;
  maxOffer: number;
}

const UserOfferRequest = () => {
  const [activeTab, setActiveTab] = useState<'Upward' | 'Downward' | 'Fixed'>('Upward');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dark = useAppSelector((state) => state.theme.mode);
  const { data, isLoading } = useGetUserOfferList();
  const { mutate: addToCartMutation, isPending } = useAddToCartMutation();



  const handleAddToCart = (artworkId: string) => {
    // Implement add to cart functionality here
    addToCartMutation(artworkId)
    console.log('Adding to cart:', artworkId);
  };

  const filteredData = data?.data?.filter((offer: Offer) => offer?.type === `${activeTab} Offer`) || [];
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div className={`p-4 ${dark ? 'bg-gray-900 text-white min-h-[50vh]' : ''}`}>
      <div className="flex gap-4 mb-6 border-b">
        {['Upward', 'Downward'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : `${dark ? 'text-gray-300 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'}`
            }`}
            onClick={() => setActiveTab(tab as 'Upward' | 'Downward' | 'Fixed')}
          >
            {tab} Offers
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y ${dark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          <thead className={dark ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Artwork</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>User</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Offer Price</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Type</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Date</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Action</th>
            </tr>
          </thead>
          <tbody className={dark ? 'bg-gray-900 divide-gray-700' : 'bg-white divide-gray-200'}>
            {paginatedData.map((offer: Offer) => (
              <tr key={offer._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{offer.artwork.artworkName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{offer.user.artistName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${dark ? 'text-gray-100' : 'text-gray-900'}`}>€{offer.offerprice}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{offer.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                    {new Date(offer.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {offer.isAccepted === true ? (
                    <span className="px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                      Accepted
                    </span>
                  ) : offer.isAccepted === false ? (
                    <span className="px-2 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
                      Rejected
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      Pending
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {offer.isAccepted === true && (
                    <button
                      onClick={() => handleAddToCart(offer.artwork._id)}
                      className={`px-3 py-1 text-sm rounded ${
                        dark 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Add to Cart
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          Showing {paginatedData.length} of {filteredData.length} results
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded hover:bg-gray-300 ${dark ? 'bg-gray-700 text-gray-100' : 'bg-gray-200'}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <button
            className={`px-3 py-1 rounded hover:bg-gray-300 ${dark ? 'bg-gray-700 text-gray-100' : 'bg-gray-200'}`}
            disabled={currentPage * itemsPerPage >= filteredData.length}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOfferRequest;