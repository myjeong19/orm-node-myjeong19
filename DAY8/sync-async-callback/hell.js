// 콜백 지옥...!!

const fnHell = () => {
  console.log('지옥 로직 1');

  //   두번째 로직
  setTimeout(() => {
    console.log('지옥 로직 2');
    setTimeout(() => {
      console.log('지옥 로직 3');
      setTimeout(() => {
        console.log('지옥 로직 4');
        setTimeout(() => {
          console.log('지옥 로직 5');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
};

const fnHeaven = () => {
  console.log('천국 로직 1');

  setTimeout(() => console.log('천국 로직 2'), 1000);
  setTimeout(() => console.log('천국 로직 3'), 2000);
  setTimeout(() => console.log('천국 로직 4'), 3000);
  setTimeout(() => console.log('천국 로직 5'), 4000);
};

fnHell();
fnHeaven();
