# Answers to technical questions

## How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

Well, I would say that I spent around 16 hours coding and I think that there's way more improvements to add like: loading states, input validation, design changes and dynamic environment variables.

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

My chosen language was Javascript and the features I used were not "brand new", but I would say that the most recent features that I used on this project was the optional chaining (?.) and nullish coalescing operator (??)(ES2020)

### Snippet of optional chaining 

```
const RestaurantsPage = ({ postcode, page, handleChangePage }: RestaurantsPageProps) => {
  
  const [areaInfo, setAreaInfo] = useState<AreaInfo>({} as AreaInfo)
  
  const totalPages = Math.ceil(areaInfo?.Restaurants?.length / ITENS_PER_PAGE);

 ```

 ### Snippet of nullish coalescing operator

 ```
const Header = ({ area, postcode, latitude, longitude }: HeaderProps) => {

  return (
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <Box display="flex" alignItems="baseline" style={{ position: "absolute", zIndex: 500 }}>
        <Typography data-cy="header-title" variant='h3' margin={0}>{area ?? "Welcome to Just Eat!"}</Typography>
        {postcode && <Typography variant="h6" margin={0}>{postcode}</Typography>}
      </Box>

      <HeaderMap latitude={latitude ?? 51.528308} longitude={longitude ?? -0.3817834} displayMarker={!!(latitude && longitude)}/>  
    </Box>
  )
}
```

## How would you track down a performance issue in production? Have you ever had to do this?
If the project has stress testing it would be easier to track it down due to information about time and amount of data. To be honest, I have never done that directly.