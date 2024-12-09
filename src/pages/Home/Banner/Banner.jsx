import { Carousel, Typography, Button, Input } from "@material-tailwind/react";

const Banner = () => {
  return (
    <div className="mb-24 mx-2 lg:mx-0">
      <Carousel className="rounded-xl h-[600px]">
        <div className="relative h-full w-full">
          <img
            src="https://i.ibb.co/PwDJb0L/hostel1.jpg"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Savor the Best Meals
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Discover our delicious and diverse meal options, meticulously
                prepared to satisfy your cravings and provide a delightful
                dining experience every day.
              </Typography>
              <div className="flex relative justify-center w-3/4 mx-auto gap-2">
                <Input
                  type="search"
                  color="white"
                  label="Type here..."
                  className="pr-20"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                />
                <Button
                  size="sm"
                  color="white"
                  className="!absolute -right-10 lg:right-1 top-1 rounded"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://i.ibb.co/tQbqM2S/hostel2.jpg"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Experience Exceptional Dining
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Indulge in our carefully curated meals, featuring fresh
                ingredients and authentic flavors. Elevate your dining
                experience with our mouth-watering breakfast, lunch, and dinner
                offerings.
              </Typography>
              <div className="flex relative justify-center w-3/4 mx-auto gap-2">
                <Input
                  type="search"
                  color="white"
                  label="Type here..."
                  className="pr-20"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                />
                <Button
                  size="sm"
                  color="white"
                  className="!absolute right-1 top-1 rounded"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://i.ibb.co/myDQMxb/hostel3.jpg"
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Taste the Difference
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Enjoy gourmet meals at your convenience, crafted by our expert
                chefs. From hearty breakfasts to sumptuous dinners, we cater to
                every palate with a variety of delectable dishes.
              </Typography>
              <div className="flex relative justify-center w-3/4 mx-auto gap-2">
                <Input
                  type="search"
                  color="white"
                  label="Type here..."
                  className="pr-20"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                />
                <Button
                  size="sm"
                  color="white"
                  className="!absolute right-1 top-1 rounded"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
