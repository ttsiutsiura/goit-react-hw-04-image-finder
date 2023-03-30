import { Searchbar } from '../Searchbar/Searchbar';
// import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Header } from './App.styled';

export const App = () => {
  return (
    <>
      <Header>
        <Searchbar onSubmit="" />
      </Header>
      <main>
        <ImageGallery />
        {/* <Button /> */}
      </main>
    </>
  );
};
