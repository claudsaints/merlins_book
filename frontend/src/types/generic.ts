export interface generic{
  data: Good | Bad
}

interface Good{
  message: string
}
interface Bad{
  status: number,
  error: string
}
