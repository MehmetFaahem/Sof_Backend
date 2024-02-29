import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OurTeamService } from '../our-team.service';
import { Pagination } from 'src/common/pagination';
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOurTeamDto } from '../dto/create-our-team.dto';
import { CreateOurTeamMemberDto } from '../dto/create-our-team-member.dto';
import { UpdateOurTeamDto } from '../dto/update-our-team.dto';
import { UpdateOurTeamMemberDto } from '../dto/update-our-team-member.dto';

@ApiTags('Our Team')
@Controller('admin/our-team')
export class AdminOurTeamController {
  constructor(private readonly ourTeamService: OurTeamService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create out team' })
  @ApiBody({
    type: CreateOurTeamDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Our team has been successfully created.',
  })
  async create(@Body() createDto: CreateOurTeamDto) {
    const ourService = await this.ourTeamService.create(createDto);
    return {
      message: 'Our team created successfully.',
      data: ourService,
    };
  }

  @Post('/members')
  @ApiOperation({ summary: 'Add member to an existing team' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateOurTeamMemberDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Team member has been successfully created.',
  })
  @UseInterceptors(FileInterceptor('image', imageOptions))
  async createTeamMember(
    @UploadedFile() image: Express.Multer.File,
    @Body() createDto: CreateOurTeamMemberDto,
  ) {
    const ourService = await this.ourTeamService.createTeamMember(
      image,
      createDto,
    );
    return {
      message: 'Team member created successfully.',
      data: ourService,
    };
  }

  @Put('/members')
  @ApiOperation({ summary: 'Update member to an existing team' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateOurTeamMemberDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Team member has been successfully created.',
  })
  @UseInterceptors(FileInterceptor('image', imageOptions))
  async updateTeamMember(
    @UploadedFile() image: Express.Multer.File,
    @Body() createDto: UpdateOurTeamMemberDto,
  ) {
    const ourService = await this.ourTeamService.updateTeamMember(
      image,
      createDto,
    );
    return {
      message: 'Team member created successfully.',
      data: ourService,
    };
  }

  @Delete('/members/:id')
  @ApiOperation({ summary: 'Delete member to an existing team' })
  @ApiResponse({
    status: 200,
    description: 'Team member has been successfully deleted.',
  })
  async deleteTeamMember(@Param('id') id: string) {
    const ourService = await this.ourTeamService.deleteTeamMember(id);
    return {
      message: 'Team member deleted successfully.',
      data: ourService,
    };
  }

  @ApiOperation({ summary: 'Get All Services' })
  @ApiResponse({
    status: 200,
    description: 'Services has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const services = await this.ourTeamService.findAllByAdmin(q);
    return {
      message: 'Our service list get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Get A Service' })
  @ApiResponse({
    status: 200,
    description: 'Service has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const services = await this.ourTeamService.findOneByAdmin(id);
    return {
      message: 'Our service details get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Update a Service' })
  @ApiResponse({
    status: 200,
    description: 'Services has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOurServiceDto: UpdateOurTeamDto,
  ) {
    const services = await this.ourTeamService.update(id, updateOurServiceDto);
    return {
      message: 'Our service updated get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Remove a Service' })
  @ApiResponse({
    status: 200,
    description: 'Services has been successfully removed',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const data = await this.ourTeamService.remove(id);
    return {
      message: 'Our service deleted successfully',
      data: data,
    };
  }
}
