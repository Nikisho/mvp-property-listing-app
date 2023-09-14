import Header from '../../components/Header/Header'
import Listing from './Listing'
import SearchComponent from './SearchComponent'

function ResultsPage() {
  return (
    <div>
        <Header />
        <SearchComponent />
        <Listing />
    </div>
  )
}

export default ResultsPage